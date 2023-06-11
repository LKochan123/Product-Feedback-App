import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './components/nav/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { RoadmapComponent } from './components/nav/roadmap/roadmap.component';
import { TagsComponent } from './components/nav/tags/tags.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { FeedbackInformationComponent } from './components/feedback-information/feedback-information.component';
import { EmptyFeedbackComponent } from './components/empty-feedback/empty-feedback.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    HeaderComponent,
    RoadmapComponent,
    TagsComponent,
    CreateFeedbackComponent,
    FeedbackInformationComponent,
    EmptyFeedbackComponent,
    FeedbackFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
