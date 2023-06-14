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
import { RoadmapBoxComponent } from './components/nav/roadmap/roadmap-box.component';
import { TagsComponent } from './components/nav/tags/tags.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { FeedbackInformationComponent } from './components/feedback-information/feedback-information.component';
import { EmptyFeedbackComponent } from './components/empty-feedback/empty-feedback.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { CategoryPipe } from './pipes/category.pipe';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { UpvotesButtonHorizontalComponent } from './components/feedback-information/upvotes-button-horizontal/upvotes-button-horizontal.component';
import { UpvotesButtonVerticalComponent } from './components/feedback-information/upvotes-button-vertical/upvotes-button-vertical.component';
import { CommentIconComponent } from './components/feedback-information/comment-icon/comment-icon.component';
import { FeedbackDetailsComponent } from './components/feedback-information/feedback-details/feedback-details.component';
import { FeedbackInfoRoadmapComponent } from './components/feedback-information/feedback-info-roadmap.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    HeaderComponent,
    RoadmapBoxComponent,
    TagsComponent,
    CreateFeedbackComponent,
    FeedbackInformationComponent,
    EmptyFeedbackComponent,
    FeedbackFormComponent,
    CategoryPipe,
    RoadmapComponent,
    UpvotesButtonHorizontalComponent,
    UpvotesButtonVerticalComponent,
    CommentIconComponent,
    FeedbackDetailsComponent,
    FeedbackInfoRoadmapComponent
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
