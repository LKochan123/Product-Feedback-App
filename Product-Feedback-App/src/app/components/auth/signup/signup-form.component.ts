import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-signup-form',
    templateUrl: './signup-form.component.html'
})
export class SignUpFormComponent implements OnInit {

    signUpForm!: FormGroup;
    showPassword = false;

    constructor(private authService: AuthService) { }

    ngOnInit() {
        // this.createSignUpForm();
        this.signUpForm = new FormGroup({
            'username': new FormControl(null, {
                validators: [Validators.required, Validators.maxLength(20)]
            }),
            'email': new FormControl(null, {
                validators: [Validators.required, Validators.email]
            }),
            'password': new FormControl(null, {
                validators: [Validators.required, Validators.minLength(4)]
            })
        })
    }

    createSignUpForm() {
        this.signUpForm = new FormGroup({
            'username': new FormControl(null, {
                validators: [Validators.required, Validators.maxLength(20)]
            }),
            'email': new FormControl(null, {
                validators: [Validators.required, Validators.email]
            }),
            'password': new FormControl(null, {
                validators: [Validators.required, Validators.minLength(4)]
            })
        })
    }

    onClear() {
        this.signUpForm.reset();
    }

    onCreateUser() {
        if (this.signUpForm.valid) {
            const { username, email, password } = this.signUpForm.value;
            this.authService.signUp(username, email, password);
        } else {
            console.log('Form invalid!')
        }
    }

    onShowPassword() {
        this.showPassword = !this.showPassword;
    }
}