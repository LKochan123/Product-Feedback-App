import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-comment-reply',
    templateUrl: './comment-reply.component.html'
})
export class CommentReplyComponent implements OnInit {

    username$!: Observable<{id: string, username: string | null}>;

    constructor(private commentsService: CommentsService) { }

    ngOnInit() {
        this.username$ = this.commentsService.getReplayComment$();
    }

    onCancel() {
        // this.commentsService.setReplyComment(null);
    }

    onReplyComment(form: NgForm) {

    }
}