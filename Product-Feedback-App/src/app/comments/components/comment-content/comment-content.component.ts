import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from 'src/app/shared/models/interfaces/comment';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html',
})
export class CommentContentComponent {
  @Input() comment!: Comment;
  isAuthenticated = this.authService.isAuthenticated;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  onReplyComment() {
    this.commentService.setReplyComment(this.comment._id);
  }
}
