import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment-add',
  templateUrl: 'comment-add.component.html',
})
export class CommentAddComponent {
  @Input() feedbackID!: string;
  comment = '';

  constructor(private commentService: CommentService) {}

  onSubmit(commentForm: NgForm) {
    if (commentForm.valid) {
      this.commentService.sendComment(this.feedbackID, commentForm.value.comment);
    }
  }
}
