import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, forkJoin, map, Subscription, of } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-roadmap-box',
  templateUrl: './roadmap-box.component.html',
})
export class RoadmapBoxComponent implements OnInit, OnDestroy {
  countPlanned!: number | string;
  countInProgress!: number | string;
  countLive!: number | string;
  forkSub!: Subscription;
  isLoading = true;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.forkSub = forkJoin([
      this.countStatusOccurance$('Planned'),
      this.countStatusOccurance$('In-Progress'),
      this.countStatusOccurance$('Live'),
    ]).subscribe(([plannedCounter, progressCounter, liveCounter]) => {
      this.countPlanned = plannedCounter;
      this.countInProgress = progressCounter;
      this.countLive = liveCounter;
      this.isLoading = false;
    });
  }

  countStatusOccurance$(status: string) {
    return this.productsService.getPostsByStatus$(status).pipe(
      map(response => response.occurance),
      catchError(() => of('x'))
    );
  }

  ngOnDestroy() {
    this.forkSub.unsubscribe();
  }
}
