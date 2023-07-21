import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './login-form.component.html'
})
export class LoginFormComponent {

    showPassword = false;
    errorText = "";

    constructor(private authService: AuthService, private router: Router) { }

    onClear(form: NgForm) {
        this.errorText = '';
        form.resetForm();
    }

    onShowPassword() {
        this.showPassword = !this.showPassword;
    }

    onLogin(form: NgForm) {
        const { username, password } = form.value;
        form.invalid || this.authService.logIn$(username, password);
    }
}