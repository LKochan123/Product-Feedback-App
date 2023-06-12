import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feedbackData!: Post[];
  allSuggestions!: number;
  isLoading = false;
  currentPage = 1;
  itemsPerPage = 2;
  itemsOptions = [1, 2, 5, 10];

  constructor(public productService: ProductsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.onGetPosts();
  }

  onChangedPage(pageEvent: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.itemsPerPage = pageEvent.pageSize;
    this.onGetPosts();
  }

  onGetPosts() {    
    this.productService.getPosts(this.itemsPerPage, this.currentPage)
    .subscribe(res => {
      this.feedbackData = res.feedbacks;
      this.allSuggestions = res.countAll;
      this.isLoading = false;
    })
  }
}
