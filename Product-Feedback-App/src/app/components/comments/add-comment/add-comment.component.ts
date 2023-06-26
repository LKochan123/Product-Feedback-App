import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-add-comment',
    templateUrl: 'add-comment.component.html',
})
export class AddCommentComponent {

    @Input() feedbackID!: string;
    comment = '';

    constructor(private commentsService: CommentsService) { }

    onSubmit(commentForm: NgForm) {
        if (commentForm.valid) {
            this.commentsService.sendComment(this.feedbackID, commentForm.value.comment);
        } else {
            console.log('Comment invalid!');
        }
    }
}