import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryTagService } from 'src/app/services/category-tag.service';
import { Subscription, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SortingFeedbackEnum } from 'src/app/models/enums/sorting-feedback';
import { CategoryTagEnum } from 'src/app/models/enums/category-tag';


@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  feedbackSuggestions!: Post[];
  category!: CategoryTagEnum;
  suggestionSubscription!: Subscription;
  categorySubscription!: Subscription;
  isLoadingData = true;
  sortingMethod!: SortingFeedbackEnum;

  constructor(private productService: ProductsService, 
    private categoryTagService: CategoryTagService) { }

  ngOnInit() {
    const sorting$ = this.categoryTagService.getCurrentSortingMethod$();
    const category$ = this.categoryTagService.getCurrentTag$();
    const suggestions$ = this.productService.getPostsUpdate$().pipe(
      map(feedbacks => feedbacks.filter(feedback => feedback.status === 'Suggestion'))
    )

    this.productService.getPosts();

    combineLatest([category$, suggestions$, sorting$]).subscribe(([category, suggestions, sorting]) => {
      this.category = category;
      this.feedbackSuggestions = suggestions;
      this.sortingMethod = sorting;
      this.isLoadingData = false
    })
  }

  trackBySuggestion(index: number, suggestion: Post) {
    return suggestion._id;
  }

}
