import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';
import { map, of, catchError } from 'rxjs';

export const authorizationGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const feedbackService = inject(FeedbackService);
  const router = inject(Router);

  const currUserID = authService.getCurrentUserID();
  const feedbackID = route.paramMap.get('id');

  if (feedbackID) {
    return feedbackService.getFeedbackById$(feedbackID).pipe(
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
