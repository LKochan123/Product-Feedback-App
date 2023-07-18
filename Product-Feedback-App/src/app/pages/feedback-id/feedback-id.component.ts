import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    templateUrl: 'feedback-id.component.html'
})
export class FeedbackIdComponent implements OnInit {

    feedback$!: Observable<Post>;
    currentUserID!: string | null;
    feedbackID!: string | null;
    isLoading = true;
    connectionError = false;
    isAuthenticated = false;

    constructor(
        private productsService: ProductsService, 
        private route: ActivatedRoute,
        private authService: AuthService) { }

    ngOnInit() {
        this.isAuthenticated = this.authService.getIsAuthenticated();
        this.currentUserID = this.authService.getCurrentUserID();
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.feedbackID = paramMap.get('id');
                this.feedback$ = this.productsService.getPostById$(this.feedbackID!).pipe(
                    map(response => response.feedback),
                    catchError(() => this.handleError()),
                    tap(() => this.isLoading = false)
                );
            } 
        })
    }

    handleError() {
        this.isLoading = false;
        this.connectionError = true;
        return throwError(() => "Error!")
    }
}