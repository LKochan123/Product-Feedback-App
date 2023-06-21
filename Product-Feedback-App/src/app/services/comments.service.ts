import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ 
    providedIn: 'root'
})
export class CommentsService {

    private replyComment$ = new Subject<string | null>();

    getReplayComment$(): Observable<string | null> {
        return this.replyComment$.asObservable();
    }

    setReplyComment(username: string | null) {
        this.replyComment$.next(username);
    }

}