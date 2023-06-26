import { Component, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-comment-content',
    templateUrl: './comment-content.component.html'
})
export class CommentContentComponent {

    @Input() comment!: {
        _id: string,
        author: string,
        email: string,
        text: string
    };

    constructor(private commentsService: CommentsService) { }

    ngOnInit() {
        // console.log(this.username)
    }

    onReplyComment() {
        const { _id, author } = this.comment;
        this.commentsService.setReplyComment(_id, author);
    }
}