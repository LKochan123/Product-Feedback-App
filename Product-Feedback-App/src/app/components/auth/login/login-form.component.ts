import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, filter, of } from 'rxjs';
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

        if (form.invalid) {
            return;
        }

        this.authService.logIn$(username, password).pipe(
            catchError((error: HttpErrorResponse) => {
                this.errorText = error.error.message;
                throw "Logging error!";
            })
        ).subscribe(res => {
            this.router.navigate(['/']);
        });
    }
}