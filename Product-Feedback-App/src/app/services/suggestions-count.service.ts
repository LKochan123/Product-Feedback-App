import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductsService } from './products.service';
import { CategoryTagService } from './category-tag.service';
import { Post } from '../models/post.model';
import { CategoryTagEnum } from '../models/enums/category-tag';

@Injectable({
    providedIn: 'root'
})
export class SuggestionsCountService implements OnDestroy {
    
    private countDisplayedSuggestions$ = new Subject<number>();
    private sub!: Subscription;

    constructor(private productService: ProductsService, 
        private categoryTagService: CategoryTagService) { }

    getCountDisplayedSuggestions$(): Observable<number> {
        return this.countDisplayedSuggestions$.asObservable();
    }

    setCountDisplayedSuggestions() { 
        const data$ = combineLatest([
            this.productService.getPostsByStatus$('Suggestion').pipe(
                map(response => response.feedbacks)
            ),
            this.categoryTagService.getCurrentTag$()
        ])

        this.sub = data$.subscribe(([suggestions, category]) => {
            const count = this.countLikeCategoryPipe(suggestions, category);
            this.countDisplayedSuggestions$.next(count);
        })
    }

    countLikeCategoryPipe(feedbacks: Post[], category: CategoryTagEnum): number {
        if (category === CategoryTagEnum.ALL) {
            return feedbacks.length;
        } else {
            return feedbacks.filter(feedback => feedback.category === category).length;
        }
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}