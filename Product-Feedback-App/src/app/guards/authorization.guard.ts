import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProductsService } from '../services/products.service';
import { map, of, catchError } from 'rxjs';

export const authorizationGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const productsService = inject(ProductsService);
  const router = inject(Router);

  const currUserID = authService.getCurrentUserID();
  const feedbackID = route.paramMap.get('id');

  if (feedbackID) {
    return productsService.getPostById$(feedbackID).pipe(
      map(res => res.feedback.author === currUserID),
      catchError(() => {
        router.navigate(['/']);
        return of(false);
      }),
      map(isAuthor => {
        if (isAuthor) {
          return true;
        } else {
          router.navigate(['/']);
          return of(false);
        }
      })
    );
  } else {
    router.navigate(['/login']);
    return of(false);
  }
};
