import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonModule } from '../shared/components/buttons/login-button/login-button.module';
import { FeedbackEmptyComponent } from './components/feedback-empty/feedback-empty.component';
import { FeedbackAddButtonComponent } from './components/feedback-buttons/feedback-add-button/feedback-add-button.component';
import { FeedbackDetailsComponent } from './components/feedback-details/feedback-details.component';
import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { PopupModule } from '../shared/components/popup/popup.module';
import { ErrorInfoModule } from '../shared/errors/error-info/error-info.module';
import { HeaderModule } from '../shared/components/header/header.module';
import { EditButtonModule } from '../shared/components/buttons/edit-button/edit-button.module';

import { CategoryPipe } from './pipes/category.pipe';
import { SortingFeedbacksPipe } from './pipes/sorting.pipe';

import { FeedbackInfoComponent } from './components/feedback-info/feedback-info.component';
import { UpvotesButtonHorizontalComponent } from './components/feedback-buttons/upvotes-button/upvotes-button-horizontal.component';
import { UpvotesButtonVerticalComponent } from './components/feedback-buttons/upvotes-button/upvotes-button-vertical.component';
import { NavModule } from '../shared/components/nav/nav.module';
import { FeedbackHomeComponent } from './features/feedback-home/feedback-home.component';
import { FeedbackFormComponent } from './features/feedback-form/feedback-form.component';
import { FeedbackCommentIconComponent } from './components/feedback-info/feedback-comment-icon/feedback-comment-icon.component';
import { FeedbackRoadmapComponent } from './features/feedback-roadmap/feedback-roadmap.component';
import { FeedbackRoadmapInfoComponent } from './components/feedback-info/feedback-roadmap-info/feedback-roadmap-info.component';
import { CommentModule } from '../comments/comment.module';
import { FeedbackIdComponent } from './features/feedback-id/feedback-id.component';

@NgModule({
  declarations: [
    CategoryPipe,
    SortingFeedbacksPipe,
    FeedbackEmptyComponent,
    FeedbackAddButtonComponent,
    FeedbackDetailsComponent,
    FeedbackInfoComponent,
    UpvotesButtonVerticalComponent,
    UpvotesButtonHorizontalComponent,
    FeedbackHomeComponent,
    FeedbackFormComponent,
    FeedbackCommentIconComponent,
    FeedbackRoadmapComponent,
    FeedbackRoadmapInfoComponent,
    FeedbackIdComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginButtonModule,
    RouterModule,
    NavModule,
    HeaderModule,
    AngularMaterialModule,
    PopupModule,
    ErrorInfoModule,
    CommentModule,
    EditButtonModule,
  ],
})
export class FeedbackModule {}
