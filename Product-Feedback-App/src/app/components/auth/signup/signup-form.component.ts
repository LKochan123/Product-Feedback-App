import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html',
    styles: [
        `.transparent-border {
            border: 0.5px solid transparent;
        }
        .error {
            border: 0.5px solid tomato;
        }`
    ]
})
export class SignUpFormComponent implements OnInit {

    signUpForm!: FormGroup;
    errorText = "";
    isSubmitted = false
    showPassword = false;

    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() {
        this.createSignUpForm();
    }

    createSignUpForm() {
        this.signUpForm = new FormGroup({
            'username': new FormControl(null, {
                validators: [Validators.required, Validators.maxLength(20), Validators.pattern(/^\S*$/)]
            }),
            'email': new FormControl(null, {
                validators: [Validators.required, Validators.email]
            }),
            'password': new FormControl(null, {
                validators: [Validators.required, Validators.minLength(4), Validators.pattern(/^\S*$/)]
            })
        })
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

    handleFormValidation() {
        const { username, email, password } = this.signUpForm.controls;
        const errorMessages = {
            usernameMaxlength: 'Username should be less than 20 characters',
            invalidEmail: 'Wrong email',
            passwordMinlength: 'Password should have min. 4 characters',
            invalidCharacters: 'Spaces are not allowed :)',
            emptyField: 'Field(s) cannot be empty'
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

    checkIsCredentialsTaken() {
        const { username, email, password } = this.signUpForm.value;
        this.authService.signUp(username, email, password);
    }

    onShowPassword() {
        this.showPassword = !this.showPassword;
    }
}