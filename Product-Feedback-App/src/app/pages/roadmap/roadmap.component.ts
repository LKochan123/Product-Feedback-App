import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Post } from 'src/app/models/post.model';
import { catchError, combineLatest, throwError } from 'rxjs';

@Component({
  templateUrl: './roadmap.component.html',
  styleUrls: ['./roadmap.component.css'],
})
export class RoadmapComponent implements OnInit {
  plannedFeedbacks!: Post[];
  inProgressFeedbacks!: Post[];
  liveFeedbacks!: Post[];

  countPlanned!: number | string | null;
  countInProgress!: number | string | null;
  countLive!: number | string | null;

  currentStatus = 'Planned';
  isLoading = true;
  connectionError = false;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    const planned$ = this.productsService.getPostsByStatus$('Planned');
    const inProgress$ = this.productsService.getPostsByStatus$('In-Progress');
    const live$ = this.productsService.getPostsByStatus$('Live');

    combineLatest([planned$, inProgress$, live$])
      .pipe(catchError(() => this.handleError()))
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
