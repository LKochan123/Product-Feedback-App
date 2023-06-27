import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription, map } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-comment-reply',
    templateUrl: './comment-reply.component.html'
})
export class CommentReplyComponent implements OnInit, OnDestroy {

    commentSub!: Subscription;
    comment!: {id: string, username: string | null};

    constructor(private commentsService: CommentsService) { }

    ngOnInit() {
        this.commentSub = this.commentsService.getReplayComment$().subscribe(res => {
            this.comment = { id: res.id, username: res.username };
        })
    }

    onCancel() {
        this.commentsService.setReplyComment(this.comment.id, null);
    }

    onReplyComment(form: NgForm) {

    }

    ngOnDestroy() {
        this.commentSub.unsubscribe();
    }
}