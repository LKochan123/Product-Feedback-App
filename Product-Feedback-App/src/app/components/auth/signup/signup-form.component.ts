import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css'],
})
export class SignUpFormComponent implements OnInit {
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

  private checkIsCredentialsTaken() {
    const { username, email, password } = this.signUpForm.value;
    this.authService.signUp(username, email, password);
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

  private createSignUpForm() {
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
}
