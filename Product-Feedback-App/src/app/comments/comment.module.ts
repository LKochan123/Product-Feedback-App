import { NgModule } from '@angular/core';
import { CommentAddComponent } from './components/comment-add/comment-add.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommentContentComponent } from './components/comment-content/comment-content.component';
import { CommentEmptyComponent } from './components/comment-empty/comment-empty.component';
import { CommentPhotoComponent } from './components/comment-photo/comment-photo.component';
import { CommentReplyComponent } from './components/comment-reply/comment-reply.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { CommentDialogComponent } from './components/comment-dialog/comment-dialog.component';
import { CommentComponent } from './features/comment/comment.component';
import { LoginButtonComponent } from '../shared/components/buttons/login-button/login-button.component';

@NgModule({
  declarations: [
    CommentAddComponent,
    CommentContentComponent,
    CommentEmptyComponent,
    CommentPhotoComponent,
    CommentReplyComponent,
    CommentDialogComponent,
    CommentComponent,
  ],
  imports: [CommonModule, FormsModule, LoginButtonComponent, AngularMaterialModule],
  exports: [
    CommentAddComponent,
    CommentContentComponent,
    CommentEmptyComponent,
    CommentPhotoComponent,
    CommentReplyComponent,
    CommentDialogComponent,
    CommentComponent,
  ],
})
export class CommentModule {}
