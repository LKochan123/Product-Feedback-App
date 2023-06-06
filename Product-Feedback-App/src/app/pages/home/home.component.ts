import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  feedbackData: Post[] = [
    {
      id: 1,
      title: 'Add tags for solution',
      category: 'Enhancment',
      upvotes: 112,
      status: 'Planned',
      description: 'Short description example data bla bla bal bla asgag o tak o suuper',
      comments: []
    },
    {
      id: 1,
      title: 'Add tags for solution',
      category: 'Enhancment',
      upvotes: 112,
      status: 'Planned',
      description: 'Short description example data bla bla bal bla asgag o tak o suuper',
      comments: []
    }
  ]

  constructor(public productService: ProductsService) { }

  ngOnInit() {
    //
  }

}
