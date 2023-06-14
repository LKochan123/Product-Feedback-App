import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ 
    providedIn: 'root'
})
export class CategoryTagService {

    private currentTag$ = new BehaviorSubject<string>('ALL');

    getCurrentTag$(): Observable<string> {
        return this.currentTag$.asObservable();
    }

    setCurrentTag(category: string) {
        this.currentTag$.next(category);
    }
}