import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  feedbackSuggestions!: Post[];
  countSuggestions = 99;
  suggestionSubscription!: Subscription;
  isLoading = true;

  constructor(public productService: ProductsService) { }

  ngOnInit() {
    this.productService.getPosts();
    this.suggestionSubscription = this.productService.getPostsUpdate$()
    .pipe(
      map(feedbacks => feedbacks.filter(feedback => feedback.status === 'Suggestion'))
    )
    .subscribe(suggestions => {
      this.feedbackSuggestions = suggestions;
      this.isLoading = false;
    })
  }

  ngOnDestroy() {
    this.suggestionSubscription.unsubscribe();
  }
}
