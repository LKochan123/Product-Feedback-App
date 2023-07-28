import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, forkJoin, map, Subscription, of, EMPTY } from 'rxjs';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';
import { StatusEnum } from 'src/app/shared/models/enums/status';

@Component({
  selector: 'app-nav-roadmap',
  templateUrl: './nav-roadmap.component.html',
})
export class NavRoadmapComponent implements OnInit, OnDestroy {
  countPlanned!: number | string;
  countInProgress!: number | string;
  countLive!: number | string;
  forkSub!: Subscription;
  isLoading = true;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    this.forkSub = forkJoin([
      this.countStatusOccurance$(StatusEnum.PLANNED),
      this.countStatusOccurance$(StatusEnum.IN_PROGRESS),
      this.countStatusOccurance$(StatusEnum.LIVE),
    ]).subscribe(([plannedCounter, progressCounter, liveCounter]) => {
      this.countPlanned = plannedCounter;
      this.countInProgress = progressCounter;
      this.countLive = liveCounter;
      this.isLoading = false;
    });
  }

  private countStatusOccurance$(status: StatusEnum) {
    return this.feedbackService.getFeedbacksByStatus$(status).pipe(
      map(response => response.occurance),
      catchError(() => EMPTY)
    );
  }

  ngOnDestroy() {
    this.forkSub.unsubscribe();
  }
}
