import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html',
})
export class CommentContentComponent implements OnInit {
  @Input() comment!: Comment;
  isAuthenticated = false;

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  onReplyComment() {
    this.commentsService.setReplyComment(this.comment.id);
  }
}
