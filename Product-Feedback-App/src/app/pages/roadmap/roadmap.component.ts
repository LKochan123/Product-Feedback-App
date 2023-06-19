import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Post } from 'src/app/models/post.model';
import { combineLatest } from 'rxjs';

@Component({
    templateUrl: './roadmap.component.html',
    styleUrls: ['./roadmap.component.css']
})
export class RoadmapComponent implements OnInit {

    plannedFeedbacks!: Post[];
    inProgressFeedbacks!: Post[];
    liveFeedbacks!: Post[];

    countPlanned: number | null = null;
    countInProgress: number | null = null;
    countLive: number | null = null;

    currentStatus = 'Planned';
    isLoading = true;

    constructor(private productsService: ProductsService) { }

    ngOnInit() {
        const planned$ = this.productsService.getPostsByStatus$('Planned');
        const inProgress$ = this.productsService.getPostsByStatus$('In-Progress');
        const live$ = this.productsService.getPostsByStatus$('Live');

        combineLatest([planned$, inProgress$, live$]).subscribe(([plannedRes, inProgressRes, liveRes]) => {
            this.plannedFeedbacks = plannedRes.feedbacks;
            this.countPlanned = plannedRes.occurance;
      
            this.inProgressFeedbacks = inProgressRes.feedbacks;
            this.countInProgress = inProgressRes.occurance;
      
            this.liveFeedbacks = liveRes.feedbacks;
            this.countLive = liveRes.occurance;
            this.isLoading = false;
        })
    }

    onStatusChange(status: string) {
        this.currentStatus = status;
    }
}
