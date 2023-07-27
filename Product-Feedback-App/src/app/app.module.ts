import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/interceptors/auth-interceptor';
import { ErrorInterceptor } from './shared/errors/interceptor/error-interceptor';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackModule } from './feedbacks/feedback.module';
import { AngularMaterialModule } from './shared/angular-material.module';
import { ErrorDialogModule } from './shared/errors/error-dialog/error-dialog.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Error404Component } from './shared/errors/error-404/error-404.component';

@NgModule({
  declarations: [AppComponent, Error404Component],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FeedbackModule,
    ErrorDialogModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
