import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/interfaces/comment.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
})
export class CommentComponent implements OnInit {
  @Input() commentsIds!: string[];
  commentsResultDetails$!: Observable<Comment[]>;
  activeReplyComment$!: Observable<string | null>;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {
    this.commentsResultDetails$ = this.commentsService.getCommentsResult(this.commentsIds);
    this.activeReplyComment$ = this.commentsService.getReplyComment$();
  }
}
