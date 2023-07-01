import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-comment-reply',
    templateUrl: './comment-reply.component.html'
})
export class CommentReplyComponent implements OnInit {

    @Input() author!: string;
    constructor(private commentsService: CommentsService) { }

    ngOnInit() {
        this.author = '@' + this.author;
    }

    onCancel() {
        this.commentsService.setReplyComment(null);
    }

    onReplyComment(form: NgForm) {

    }
}