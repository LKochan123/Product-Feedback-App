import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
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
    this.signUpForm.invalid ? this.handleFormValidation() : this.checkIsCredentialsTaken();
    this.isSubmitted = true;
  }

  onShowPassword() {
    this.showPassword = !this.showPassword;
  }

  private createSignUpForm() {
    //Formularz nie jest otypowany
    //zadne z tych pull nigdy nie jest nullem!
    this.signUpForm = new FormGroup({
      username: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(20), Validators.pattern(/^\S*$/)],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(4), Validators.pattern(/^\S*$/)],
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

  private checkIsCredentialsTaken() {
    const { username, email, password } = this.signUpForm.value;
    this.authService.signup(username, email, password);
  }
}
