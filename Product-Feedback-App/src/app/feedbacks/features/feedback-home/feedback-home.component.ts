import { Component, OnInit } from '@angular/core';
import { CategoryTagEnum } from 'src/app/shared/models/enums/category-tag';
import { SortingFeedbackEnum } from 'src/app/shared/models/enums/sorting-feedback';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';
import { map, catchError, throwError, combineLatest } from 'rxjs';
import { FeedbackService } from '../../services/feedback.service';
import { CategoryTagService } from '../../services/category-tag.service';
import { StatusEnum } from 'src/app/shared/models/enums/status';

@Component({
  templateUrl: './feedback-home.component.html',
})
export class FeedbackHomeComponent implements OnInit {
  feedbackSuggestions!: Feedback[];
  category!: CategoryTagEnum;
  sortingMethod!: SortingFeedbackEnum;
  isLoadingData = true;
  connectionsError = false;

  constructor(
    private feedbackService: FeedbackService,
    private categoryTagService: CategoryTagService
  ) {}

  ngOnInit() {
    const sorting$ = this.categoryTagService.getCurrentSortingType$();
    const category$ = this.categoryTagService.getCurrentTag$();
    const suggestions$ = this.feedbackService
      .getFeedbacksUpdate$()
      .pipe(
        map(feedbacks => feedbacks.filter(feedback => feedback.status === StatusEnum.SUGGESTION))
      );

    this.feedbackService
      .getFeedbacks()
      .pipe(
        catchError(error => {
          this.isLoadingData = false;
          this.connectionsError = true;
          return throwError(() => error);
        })
      )
      .subscribe(res => {
        this.feedbackService.feedbacks$.next([...res.feedbacks]);
      });

    combineLatest([category$, suggestions$, sorting$]).subscribe(
      ([category, suggestions, sorting]) => {
        this.category = category;
        this.feedbackSuggestions = suggestions;
        this.sortingMethod = sorting;
        this.isLoadingData = false;
      }
    );
  }
}
