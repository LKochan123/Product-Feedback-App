import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';
import { Comment } from 'src/app/shared/models/interfaces/comment.model';
import { environemnt } from 'src/environments/environment';
import { User } from 'src/app/shared/models/interfaces/user.model';
import { switchMap, combineLatest, zip, toArray, defaultIfEmpty } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private replyComment$ = new Subject<string | null>();
  private url = environemnt.apiUrl + 'feedbacks/';
  private commentURL = environemnt.apiUrl + 'comment/';

  constructor(
    private http: HttpClient,
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) {}

  getReplyComment$(): Observable<string | null> {
    return this.replyComment$.asObservable();
  }

  setReplyComment(id: string | null) {
    this.replyComment$.next(id);
  }

  sendComment(feedbackID: string, text: string) {
    const request = { text };
    this.http
      .post<{ message: string }>(this.url + feedbackID + '/comments', request)
      .subscribe(() => {
        //subscribe zawsze pusty!
        window.location.reload();
      });
  }

  getCommentsToEachFeedback(feedbackID: string) {
    return this.feedbackService
      .getFeedbackById$(feedbackID)
      .pipe(map(res => res.feedback.comments));
  }

  getCommentsByIDs(ids: string[]) {
    const query = `?ids=${ids.join(',')}`;
    return this.http.get<{ message: string; comments: Comment[] }>(
      this.commentURL + 'multiple' + query
    );
  }

  getCommentByID(id: string) {
    return this.http.get<{ message: string; comment: Comment }>(this.commentURL + id);
  }

  getCommentsResult(commentIDs: string[]): Observable<Comment[]> {
    const commentAuthors$ = this.getAutorDetails(commentIDs);
    const comments$ = this.getCommentsByIDs(commentIDs).pipe(map(res => res.comments));
    const combined$ = combineLatest([commentAuthors$, comments$]);

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

  //literowka - Author
  private getAutorDetails(commentIDs: string[]): Observable<User[]> {
    return this.getCommentsByIDs(commentIDs).pipe(
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
}
