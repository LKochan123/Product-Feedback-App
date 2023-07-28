import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';

import { SignupComponent } from './features/signup/signup.component';
import { LoginComponent } from './features/login/login.component';
import { ReturnHomeComponent } from '../shared/components/buttons/return-home/return-home.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule, ReturnHomeComponent],
})
export class AuthModule {}
