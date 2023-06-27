import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryTagService } from 'src/app/services/category-tag.service';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feedbackSuggestions!: Post[];
  category!: string;
  suggestionSubscription!: Subscription;
  categorySubscription!: Subscription;
  isLoadingData = true;

  constructor(private productService: ProductsService, 
    private categoryTagService: CategoryTagService) { }

  ngOnInit() {
    const category$ = this.categoryTagService.getCurrentTag$();
    const suggestions$ = this.productService.getPostsUpdate$().pipe(
      map(feedbacks => feedbacks.filter(feedback => feedback.status === 'Suggestion'))
    )

    this.productService.getPosts();

    combineLatest([category$, suggestions$]).subscribe(([category, suggestions]) => {
      this.category = category;
      this.feedbackSuggestions = suggestions;
      this.isLoadingData = false
    })
  }

  trackBySuggestion(index: number, suggestion: Post) {
    return suggestion._id;
  }

}
