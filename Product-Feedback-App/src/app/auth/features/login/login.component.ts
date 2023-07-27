import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
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
    form.invalid || this.authService.login$(username, password);
  }
}
