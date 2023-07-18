import { NgModule } from '@angular/core';
import { SignUpComponent } from './signup.component';
import { SignUpFormComponent } from 'src/app/components/auth/signup/signup-form.component';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
    declarations: [SignUpComponent, SignUpFormComponent],
    imports: [SharedModule]
})
export class SignupModule { }