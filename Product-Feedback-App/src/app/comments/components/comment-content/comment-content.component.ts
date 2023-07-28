import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommentService } from '../../services/comment.service';
import { Comment } from 'src/app/shared/models/interfaces/comment.model';

@Component({
  selector: 'app-comment-content',
  templateUrl: './comment-content.component.html',
})
export class CommentContentComponent implements OnInit {
  @Input() comment!: Comment;
  isAuthenticated = false;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // czemu to jest w onInit?
    this.isAuthenticated = this.authService.isAuthenticated;
  }

  onReplyComment() {
    this.commentService.setReplyComment(this.comment._id);
  }
}
