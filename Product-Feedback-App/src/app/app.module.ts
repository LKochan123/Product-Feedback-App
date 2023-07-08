import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { SortingFeedbacksPipe } from './pipes/sorting.pipe';
import { TruncatePipe } from './pipes/trancute.pipe';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { UpvotesButtonHorizontalComponent } from './components/buttons/upvotes-button/upvotes-button-horizontal.component';
import { UpvotesButtonVerticalComponent } from './components/buttons/upvotes-button/upvotes-button-vertical.component';
import { CommentIconComponent } from './components/feedback-information/comment-icon/comment-icon.component';
import { FeedbackDetailsComponent } from './components/feedback-information/feedback-details/feedback-details.component';
import { FeedbackInfoRoadmapComponent } from './components/feedback-information/feedback-info-roadmap.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { SignUpFormComponent } from './components/auth/signup/signup-form.component';
import { LoginFormComponent } from './components/auth/login/login-form.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { DropdownMenuComponent } from './components/buttons/dropdown-menu/dropdown-menu.component';
import { AddFeedbackButtonComponent } from './components/buttons/add-feedback-button/add-feedback-button.component';
import { LoginButtonComponent } from './components/buttons/login-button/login-button.component';
import { ReturnHomeButtonComponent } from './components/buttons/return-home-button/return-home-button';
import { FeedbackIdComponent } from './pages/feedback-id/feedback-id.component';
import { EditButtonComponent } from './components/buttons/edit-button/edit-button.component';
import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentReplyComponent } from './components/comments/comment-reply/comment-reply.component';
import { CommentPhotoComponent } from './components/comments/comment-photo/comment-photo.component';
import { CommentContentComponent } from './components/comments/comment-content/comment-content.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { AdminSectionComponent } from './components/admin/admin-section/admin-section.component';

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
    SortingFeedbacksPipe,
    TruncatePipe,
    RoadmapComponent,
    UpvotesButtonHorizontalComponent,
    UpvotesButtonVerticalComponent,
    CommentIconComponent,
    FeedbackDetailsComponent,
    FeedbackInfoRoadmapComponent,
    SignUpFormComponent,
    SignUpComponent,
    LoginFormComponent,
    LoginComponent,
    DropdownMenuComponent,
    AddFeedbackButtonComponent,
    LoginButtonComponent,
    ReturnHomeButtonComponent,
    FeedbackIdComponent,
    EditButtonComponent,
    AddCommentComponent,
    CommentComponent,
    CommentReplyComponent,
    CommentPhotoComponent,
    CommentContentComponent,
    ErrorPageComponent,
    AdminComponent,
    AdminNavComponent,
    AdminSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
