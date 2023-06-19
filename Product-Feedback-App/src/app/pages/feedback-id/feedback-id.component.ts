import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
    templateUrl: 'feedback-id.component.html'
})
export class FeedbackIdComponent {

    feedback!: Post;
    feedbackID!: string;
    isLoading = true;

    constructor(private productsService: ProductsService, 
        private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.feedbackID = paramMap.get('id')!;
                this.productsService.getPostById$(this.feedbackID!).subscribe(response => {
                    this.feedback = response.feedback;
                    this.isLoading = false;
                })
            } 
        })
    }
}