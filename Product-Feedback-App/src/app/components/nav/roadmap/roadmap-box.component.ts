import { Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-roadmap-box',
  templateUrl: './roadmap-box.component.html'
})
export class RoadmapBoxComponent implements OnInit {

  countPlanned!: number;
  countInProgress!: number;
  countLive!: number;
  isLoading = true;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    forkJoin([
      this.countStatusOccurance$('Planned'),
      this.countStatusOccurance$('In-Progress'),
      this.countStatusOccurance$('Live')
    ]).subscribe(([plannedCounter, progressCounter, liveCounter]) => {
      this.countPlanned = plannedCounter;
      this.countInProgress = progressCounter;
      this.countLive = liveCounter;
      this.isLoading = false;
    })
  }

  countStatusOccurance$(status: string) {
    return this.productsService.getPostsByStatus$(status).pipe(
      map(response => response.occurance)
    );
  }
}
