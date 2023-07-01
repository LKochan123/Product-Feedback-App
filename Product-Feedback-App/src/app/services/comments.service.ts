import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, map } from 'rxjs';
import { ProductsService } from './products.service';
import { Comment } from '../models/comment.model';

@Injectable({ 
    providedIn: 'root'
})
export class CommentsService {

    private replyComment$ = new Subject<string | null>();
    private url = 'http://localhost:3000/feedbacks/';
    private commentURL = 'http://localhost:3000/comment/';

    constructor(
        private http: HttpClient, 
        private productsService: ProductsService) { }

    getReplayComment$(): Observable<string | null> {
        return this.replyComment$.asObservable();
    }

    setReplyComment(id: string | null) {
        this.replyComment$.next(id);
    }

    sendComment(feedbackID: string, text: string) {
        const request = { text: text };
        this.http.post<{message: string}>(this.url + feedbackID + '/comments', request).subscribe(res => {
            window.location.reload();
        })
    }

    getCommentsToEachFeedback(feedbackID: string) {
        return this.productsService.getPostById$(feedbackID).pipe(
            map(res => res.feedback.comments)
        );
    }

    getCommentsByIDs(ids: string[]) {
        const query = `?ids=${ids.join(',')}`;
        return this.http.get<{message: string, comments: Comment[]}>(this.commentURL + 'multiple' + query);
    }

    getCommentByID(id: string) { 
        return this.http.get<{message: string, comment: Comment}>(this.commentURL + id);
    }
}