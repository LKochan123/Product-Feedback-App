import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  showPassword = false;

  constructor(private authService: AuthService) {}

  onClear(form: NgForm) {
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
