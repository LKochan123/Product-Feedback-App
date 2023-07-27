import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginButtonComponent } from './login-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoginButtonComponent],
  imports: [CommonModule, RouterModule],
  exports: [LoginButtonComponent],
})
export class LoginButtonModule {}
