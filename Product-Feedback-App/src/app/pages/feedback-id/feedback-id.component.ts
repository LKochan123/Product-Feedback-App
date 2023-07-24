import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from 'src/app/models/interfaces/post.model';
import { ProductsService } from 'src/app/services/products.service';
import { Observable, map, tap, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  templateUrl: 'feedback-id.component.html',
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
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated;
    this.currentUserID = this.authService.currentUserID;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.feedbackID = paramMap.get('id');
        this.feedback$ = this.productsService.getPostById$(this.feedbackID!).pipe(
          map(response => response.feedback),
          catchError(() => this.handleError()),
          tap(() => (this.isLoading = false))
        );
      }
    });
  }

  private handleError() {
    this.isLoading = false;
    this.connectionError = true;
    return throwError(() => 'Error!');
  }
}
