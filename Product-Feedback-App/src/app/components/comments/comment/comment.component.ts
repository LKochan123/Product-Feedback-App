import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/interfaces/comment.model';
import { map, switchMap, Observable, zip, combineLatest, toArray, defaultIfEmpty } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/interfaces/user.model';

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
})
export class CommentComponent implements OnInit {
  @Input() commentsIds!: string[];
  commentsResultDetails$!: Observable<Comment[]>;
  activeReplyComment$!: Observable<string | null>;

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const commentAuthors$ = this.getAutorDetails(this.commentsIds);
    const comments$ = this.commentsService
      .getCommentsByIDs(this.commentsIds)
      .pipe(map(res => res.comments));
    const combined$ = combineLatest([commentAuthors$, comments$]);
    this.commentsResultDetails$ = this.getCommentsResult(combined$);
    this.activeReplyComment$ = this.commentsService.getReplyComment$();
  }

  private getAutorDetails(commentIds: string[]) {
    return this.commentsService.getCommentsByIDs(commentIds).pipe(
      map(res => res.comments),
      switchMap(commentsObs => {
        const authorIDs = commentsObs.map(comment => comment.author);
        const userObs: Observable<User>[] = authorIDs.map(authorId => {
          return this.authService.getUserById(authorId).pipe(map(res => res.user));
        });
        return combineLatest(userObs);
      })
    );
  }

  private getCommentsResult(combined$: Observable<[User[], Comment[]]>) {
    return combined$.pipe(
      switchMap(([commentAuthors, comments]) =>
        zip(commentAuthors, comments).pipe(
          map(([commentAuthor, comment]) => ({
            _id: comment._id,
            author: commentAuthor.username,
            email: commentAuthor.email,
            text: comment.text,
          }))
        )
      ),
      toArray(),
      defaultIfEmpty([])
    );
  }
}
