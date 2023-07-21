import { Component, OnInit, Input } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { Comment } from 'src/app/models/comment.model';
import { map, switchMap, Observable, zip, combineLatest, toArray, Subscription, defaultIfEmpty } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

// interfejs powinien byc trzymany w osobnym pliku, plus po co jest to I w nazwie?
interface IComment {
  id: string;
  author: string;
  email: string;
  text: string;
}

@Component({
  selector: 'app-comment',
  templateUrl: 'comment.component.html',
})
export class CommentComponent implements OnInit {
  @Input() commentsIds!: string[];
  commentsResultDetails$!: Observable<IComment[]>;
  activeReplyComment$!: Observable<string | null>;
  commentReplySub!: Subscription;

  constructor(private commentsService: CommentsService, private authService: AuthService) {}

  ngOnInit() {
    const commentAuthors$ = this.getCommentAuthorsDetails(this.commentsIds);
    const comments$ = this.commentsService.getCommentsByIDs(this.commentsIds).pipe(map((res) => res.comments));
    const combined$ = combineLatest([commentAuthors$, comments$]);
    this.commentsResultDetails$ = this.getCommentsResult(combined$);
    //Czemu nie inicjalizujesz tego pola od razu, tylko dopiero tutaj?
    this.activeReplyComment$ = this.commentsService.getReplayComment$();
  }

  // Czytając nazwę metody nie mam pojęcia co robi. Ja to czytam tak: weź komentarz autorzy szczegóły. Do tego czytam ten kod dłuzsza chwile i nadal nie jestem pewien, do czego on sluzy. Dobra nazwa by serio pomogla.
  // Kolejna kwestia - tej logiki w ogole nie powinno tutaj byc. Powinna znalezc sie w serwisie dotyczacym komentarzy.
  getCommentAuthorsDetails(commentIds: string[]) {
    return this.commentsService.getCommentsByIDs(commentIds).pipe(
      map((res) => res.comments),
      switchMap((commentsObs) => {
        const authorIDs = commentsObs.map((comment) => comment.author);
        const userObs: Observable<User>[] = authorIDs.map((authorId) => {
          return this.authService.getUserById(authorId).pipe(map((res) => res.user));
        });
        return combineLatest(userObs);
      })
    );
  }

  getCommentsResult(combined$: Observable<[User[], Comment[]]>) {
    return combined$.pipe(
      switchMap(([commentAuthors, comments]) =>
        zip(commentAuthors, comments).pipe(
          map(([commentAuthor, comment]) => ({
            id: comment._id,
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
