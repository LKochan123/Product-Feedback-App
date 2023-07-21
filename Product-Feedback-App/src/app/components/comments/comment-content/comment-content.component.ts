import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
    selector: 'app-comment-content',
    templateUrl: './comment-content.component.html'
})
export class CommentContentComponent implements OnInit {

    isAuthenticated = false;
    @Input() comment!: {
        id: string,
        author: string,
        email: string,
        text: string
    };

    constructor(private commentsService: CommentsService, 
        private authService: AuthService) { }

    ngOnInit() {
        this.isAuthenticated = this.authService.getIsAuthenticated();
    }

    onReplyComment() {
        this.commentsService.setReplyComment(this.comment.id);
    }
}