import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';
import { catchError, combineLatest, throwError } from 'rxjs';
import { StatusEnum } from 'src/app/shared/models/enums/status';

@Component({
  templateUrl: './feedback-roadmap.component.html',
  styleUrls: ['./feedback-roadmap.component.css'],
})
export class FeedbackRoadmapComponent implements OnInit {
  plannedFeedbacks!: Feedback[];
  inProgressFeedbacks!: Feedback[];
  liveFeedbacks!: Feedback[];

  countPlanned!: number | string | null;
  countInProgress!: number | string | null;
  countLive!: number | string | null;

  currentStatus = 'Planned';
  isLoading = true;
  connectionError = false;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    const planned$ = this.feedbackService.getFeedbacksByStatus$(StatusEnum.PLANNED);
    const inProgress$ = this.feedbackService.getFeedbacksByStatus$(StatusEnum.IN_PROGRESS);
    const live$ = this.feedbackService.getFeedbacksByStatus$(StatusEnum.LIVE);

    combineLatest([planned$, inProgress$, live$])
      .pipe(catchError(this.handleError))
      .subscribe(([plannedRes, inProgressRes, liveRes]) => {
        this.plannedFeedbacks = plannedRes.feedbacks;
        this.countPlanned = plannedRes.occurance;

        this.inProgressFeedbacks = inProgressRes.feedbacks;
        this.countInProgress = inProgressRes.occurance;

        this.liveFeedbacks = liveRes.feedbacks;
        this.countLive = liveRes.occurance;
        this.isLoading = false;
      });
  }

  onStatusChange(status: string) {
    this.currentStatus = status;
  }

  private handleError() {
    (this.countPlanned = 'x'), (this.countLive = 'x'), (this.countInProgress = 'x');
    this.isLoading = false;
    this.connectionError = true;
    return throwError(() => 'Error');
  }
}
