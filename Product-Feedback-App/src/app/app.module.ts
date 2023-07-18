import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
// import { AdminModule } from './pages/admin/admin.module';

import { CategoryPipe } from './pipes/category.pipe';
import { SortingFeedbacksPipe } from './pipes/sorting.pipe';
import { TruncatePipe } from './pipes/trancute.pipe';
import { SearchUserPipe } from './pipes/search-user.pipe';

import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { FeedbackInformationComponent } from './components/feedback-information/feedback-information.component';
import { EmptyFeedbackComponent } from './components/empty-feedback/empty-feedback.component';
import { FeedbackFormComponent } from './components/feedback-form/feedback-form.component';
import { FeedbackDetailsComponent } from './components/feedback-information/feedback-details/feedback-details.component';
import { FeedbackInfoRoadmapComponent } from './components/feedback-information/feedback-info-roadmap.component';
import { AddFeedbackButtonComponent } from './components/buttons/add-feedback-button/add-feedback-button.component';
import { FeedbackIdComponent } from './pages/feedback-id/feedback-id.component';

import { AdminComponent } from './pages/admin/admin.component';
import { AdminNavComponent } from './components/admin/admin-nav/admin-nav.component';
import { AdminStatusComponent } from './components/admin/admin-status/admin-status.component';
import { AdminRolesComponent } from './components/admin/admin-roles/admin-roles.component';

import { AuthInterceptor } from './interceptors/auth-interceptor';
import { SignUpComponent } from './pages/signup/signup.component';
import { SignUpFormComponent } from './components/auth/signup/signup-form.component';
import { LoginFormComponent } from './components/auth/login/login-form.component';
import { LoginComponent } from './pages/login/login.component';

import { CommentIconComponent } from './components/feedback-information/comment-icon/comment-icon.component';
import { AddCommentComponent } from './components/comments/add-comment/add-comment.component';
import { CommentComponent } from './components/comments/comment/comment.component';
import { CommentReplyComponent } from './components/comments/comment-reply/comment-reply.component';
import { CommentPhotoComponent } from './components/comments/comment-photo/comment-photo.component';
import { CommentContentComponent } from './components/comments/comment-content/comment-content.component';

import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { ErrorDialogComponent } from './components/errors/error-dialog/error-dialog.component';
import { ErrorInfoComponent } from './components/errors/error-info/error-info.component';

import { UpvotesButtonHorizontalComponent } from './components/buttons/upvotes-button/upvotes-button-horizontal.component';
import { UpvotesButtonVerticalComponent } from './components/buttons/upvotes-button/upvotes-button-vertical.component';
import { DropdownMenuComponent } from './components/buttons/dropdown-menu/dropdown-menu.component';
import { LoginButtonComponent } from './components/buttons/login-button/login-button.component';
import { ReturnHomeButtonComponent } from './components/buttons/return-home-button/return-home-button';
import { EditButtonComponent } from './components/buttons/edit-button/edit-button.component';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './components/nav/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { RoadmapBoxComponent } from './components/nav/roadmap/roadmap-box.component';
import { TagsComponent } from './components/nav/tags/tags.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { RoleDialogComponent } from './components/admin/role-dialog/role-dialog.component';
import { NoCommentComponent } from './components/comments/no-comment/no-comment.component';
// import { SignupModule } from './pages/signup/signup.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryPipe,
    SortingFeedbacksPipe,
    TruncatePipe,
    SearchUserPipe,
    CreateFeedbackComponent,
    FeedbackInformationComponent,
    EmptyFeedbackComponent,
    FeedbackFormComponent,
    FeedbackDetailsComponent,
    FeedbackInfoRoadmapComponent,
    AddFeedbackButtonComponent,
    FeedbackIdComponent,
    SignUpFormComponent,
    SignUpComponent,
    LoginFormComponent,
    LoginComponent,
    AdminComponent,
    AdminNavComponent,
    AdminStatusComponent,
    AdminRolesComponent,
    ErrorPageComponent,
    ErrorDialogComponent,
    ErrorInfoComponent,
    AddCommentComponent,
    CommentComponent,
    CommentReplyComponent,
    CommentPhotoComponent,
    CommentContentComponent,
    CommentIconComponent,
    NoCommentComponent,
    NavigationComponent,
    HeaderComponent,
    RoadmapBoxComponent,
    RoadmapComponent,
    TagsComponent,
    UpvotesButtonHorizontalComponent,
    UpvotesButtonVerticalComponent,
    DropdownMenuComponent,
    LoginButtonComponent,
    ReturnHomeButtonComponent,
    EditButtonComponent,
    RoleDialogComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    // SignupModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
