import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { CategoryTagService } from 'src/app/services/category-tag.service';
import { Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

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

  ngOnDestroy() {
    // this.categorySubscription.unsubscribe();
    // this.suggestionSubscription.unsubscribe();
  }
}
