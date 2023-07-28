import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { signupForm } from 'src/app/shared/models/types/signup-form.type';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup<signupForm> = this.createSignUpForm();
  errorText = '';
  isSubmitted = false;
  showPassword = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.createSignUpForm();
  }

  onClear() {
    this.errorText = '';
    this.isSubmitted = false;
    this.signUpForm.reset();
  }

  onCreateUser() {
    this.signUpForm.invalid
      ? this.handleFormValidation()
      : this.authService.signup(this.signUpForm);
    this.isSubmitted = true;
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  private createSignUpForm() {
    return new FormGroup<signupForm>({
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^\S*$/),
        ],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4), Validators.pattern(/^\S*$/)],
        nonNullable: true,
      }),
    });
  }

  private handleFormValidation() {
    const { username, email, password } = this.signUpForm.controls;
    const errorMessages = {
      usernameMaxlength: 'Username should be less than 20 characters',
      invalidEmail: 'Wrong email',
      passwordMinlength: 'Password should have min. 4 characters',
      invalidCharacters: 'Spaces are not allowed :)',
      emptyField: 'Field(s) cannot be empty',
    };

    if (username.errors?.['maxlength']) {
      this.errorText = errorMessages.usernameMaxlength;
    } else if (email.errors?.['email']) {
      this.errorText = errorMessages.invalidEmail;
    } else if (password.errors?.['minlength']) {
      this.errorText = errorMessages.passwordMinlength;
    } else if (username.errors?.['pattern'] || password.errors?.['pattern']) {
      this.errorText = errorMessages.invalidCharacters;
    } else {
      this.errorText = errorMessages.emptyField;
    }
  }
}
