import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feedbackData$!: Observable<Post[]>;

  constructor(public productService: ProductsService) { }

  ngOnInit() {
    this.feedbackData$ = this.productService.getPosts().pipe(
      map(res => res.feedbacks)
    );
  }
}
