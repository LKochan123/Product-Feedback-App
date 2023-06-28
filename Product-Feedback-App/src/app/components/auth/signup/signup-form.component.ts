import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    isSubmitted = false;
    errorText = '';
    showPassword = false;

    constructor(private authService: AuthService) { }

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
        if (this.signUpForm.invalid) {
            const { username, email, password } = this.signUpForm.controls;
            if (username.errors?.['maxlength']) {
                this.errorText = 'Username should be less then 20 characters';
            } else if (email.errors?.['email']) {
                this.errorText = 'Wrong email';
            } else if (password.errors?.['minlength']) {
                this.errorText = 'Password should have min. 4 characters';
            } else if (username.errors?.['pattern'] || password.errors?.['pattern']) {
                this.errorText = 'Spaces are not allowed :)';
            } else {
                this.errorText = 'Cant be empty';
            }
        } else {
            const { username, email, password } = this.signUpForm.value;
            this.authService.signUp(username, email, password);
        }
        this.isSubmitted = true;
    }

    onShowPassword() {
        this.showPassword = !this.showPassword;
    }
}