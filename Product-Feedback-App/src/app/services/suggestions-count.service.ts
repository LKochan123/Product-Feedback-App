import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, combineLatest, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductsService } from './products.service';
import { CategoryTagService } from './category-tag.service';
import { Post } from '../models/interfaces/post.model';
import { CategoryTagEnum } from '../models/enums/category-tag';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsCountService implements OnDestroy {
  private displayedSuggestionCount$ = new Subject<number>();
  private sub!: Subscription;

  constructor(
    private productService: ProductsService,
    private categoryTagService: CategoryTagService
  ) {}

  getDisplayedSuggestionCount$(): Observable<number> {
    return this.displayedSuggestionCount$.asObservable();
  }

  setDisplayedSuggestionCount$() {
    const data$ = combineLatest([
      this.productService.getPostsByStatus$('Suggestion').pipe(map(response => response.feedbacks)),
      this.categoryTagService.getCurrentTag$(),
    ]);

    this.sub = data$
      .pipe(
        tap(([suggestions, category]) => {
          const count = this.getFeedbacksCountInGivenCategory(suggestions, category);
          this.displayedSuggestionCount$.next(count);
        })
      )
      .subscribe();
  }

  private getFeedbacksCountInGivenCategory(feedbacks: Post[], category: CategoryTagEnum): number {
    if (category === CategoryTagEnum.ALL) return feedbacks.length;
    return feedbacks.filter(feedback => feedback.category === category).length;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
