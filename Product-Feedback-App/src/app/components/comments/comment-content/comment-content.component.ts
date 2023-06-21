import { Component } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-comment-content',
    templateUrl: './comment-content.component.html'
})
export class CommentContentComponent {

    username = 'James Skriner';

    constructor(private commentsService: CommentsService) { }

    onReplyComment() {
        this.commentsService.setReplyComment(this.username);
    }
}