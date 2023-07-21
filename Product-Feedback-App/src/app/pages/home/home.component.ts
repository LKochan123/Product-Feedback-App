import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryTagService } from 'src/app/services/category-tag.service';
import { Subscription, combineLatest, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SortingFeedbackEnum } from 'src/app/models/enums/sorting-feedback';
import { CategoryTagEnum } from 'src/app/models/enums/category-tag';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  feedbackSuggestions!: Post[];
  category!: CategoryTagEnum;
  sortingMethod!: SortingFeedbackEnum;
  suggestionSubscription!: Subscription;
  categorySubscription!: Subscription;
  isLoadingData = true;
  connectionsError = false;

  constructor(private productService: ProductsService, 
    private categoryTagService: CategoryTagService) { }

  ngOnInit() {
    const sorting$ = this.categoryTagService.getCurrentSortingMethod$();
    const category$ = this.categoryTagService.getCurrentTag$();
    const suggestions$ = this.productService.getPostsUpdate$().pipe(
      map(feedbacks => feedbacks.filter(feedback => feedback.status === 'Suggestion'))
    )

    // IMPORTANT!
    this.productService.getPosts().pipe(
      catchError(error => {
        this.isLoadingData = false;
        this.connectionsError = true;
        return throwError(() => error);
      })
    ).subscribe(res => {
      this.productService.feedbacks$.next([...res.feedbacks]);
    })

    combineLatest([category$, suggestions$, sorting$]).subscribe(([category, suggestions, sorting]) => {
      this.category = category;
      this.feedbackSuggestions = suggestions;
      this.sortingMethod = sorting;
      this.isLoadingData = false
    });
  }

  trackBySuggestion(index: number, suggestion: Post) {
    return suggestion._id;
  }

}
