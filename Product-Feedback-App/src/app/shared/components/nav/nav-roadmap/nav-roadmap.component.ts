import { Component } from '@angular/core';
import { catchError, map, EMPTY, startWith } from 'rxjs';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';
import { StatusEnum } from 'src/app/shared/models/enums/status';

@Component({
  selector: 'app-nav-roadmap',
  templateUrl: './nav-roadmap.component.html',
})
export class NavRoadmapComponent {
  countPlanned$ = this.countStatusOccurance$(StatusEnum.PLANNED).pipe(startWith('..'));
  countInProgress$ = this.countStatusOccurance$(StatusEnum.IN_PROGRESS).pipe(startWith('..'));
  countLive$ = this.countStatusOccurance$(StatusEnum.LIVE).pipe(startWith('..'));

  constructor(private feedbackService: FeedbackService) {}

  private countStatusOccurance$(status: StatusEnum) {
    return this.feedbackService.getFeedbacksByStatus$(status).pipe(
      map(response => response.occurance),
      catchError(() => EMPTY)
    );
  }
}
