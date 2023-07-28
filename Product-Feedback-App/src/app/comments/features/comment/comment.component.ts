import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from 'src/app/shared/models/interfaces/comment.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
})
export class CommentComponent implements OnInit {
  @Input() commentsIds!: string[];
  commentsResultDetails$!: Observable<Comment[]>;
  activeReplyComment$!: Observable<string | null>;

  constructor(private commentService: CommentService) {}

  ngOnInit() {
    //czemu to jest w onInit?
    this.commentsResultDetails$ = this.commentService.getCommentsResult(this.commentsIds);
    this.activeReplyComment$ = this.commentService.getReplyComment$();
  }
}
