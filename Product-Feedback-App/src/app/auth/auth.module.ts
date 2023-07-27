import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { ReturnHomeModule } from '../shared/components/buttons/return-home/return-home.module';

import { SignupComponent } from './features/signup/signup.component';
import { LoginComponent } from './features/login/login.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AuthRoutingModule, ReturnHomeModule],
})
export class AuthModule {}
