import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, combineLatest, Subscription, throwError } from 'rxjs';
import { map, tap, catchError, startWith } from 'rxjs/operators';
import { FeedbackService } from './feedback.service';
import { CategoryTagService } from './category-tag.service';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';
import { CategoryTagEnum } from 'src/app/shared/models/enums/category-tag';
import { StatusEnum } from 'src/app/shared/models/enums/status';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsService implements OnDestroy {
  private displayedSuggestionCount$ = new Subject<number | string>();
  private sub!: Subscription;

  constructor(
    private feedbackService: FeedbackService,
    private categoryTagService: CategoryTagService
  ) {}

  getDisplayedSuggestionCount$(): Observable<number | string> {
    return this.displayedSuggestionCount$
      .asObservable()
      .pipe(startWith('..'), catchError(this.handleError));
  }

  setDisplayedSuggestionCount$() {
    const data$ = combineLatest([
      this.feedbackService
        .getFeedbacksByStatus$(StatusEnum.SUGGESTION)
        .pipe(map(response => response.feedbacks)),
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

  private getFeedbacksCountInGivenCategory(
    feedbacks: Feedback[],
    category: CategoryTagEnum
  ): number {
    if (category === CategoryTagEnum.ALL) return feedbacks.length;
    return feedbacks.filter(feedback => feedback.category === category).length;
  }

  private handleError() {
    return throwError(() => 'Error with counting status!');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
