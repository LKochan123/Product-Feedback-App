import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from "../services/auth.service";
import { ProductsService } from '../services/products.service';
import { map } from 'rxjs';
import { CreateFeedbackComponent } from '../pages/create-feedback/create-feedback.component';

export const feedbackAuthorGuard = () => {
    const authService = inject(AuthService);
    const productsService = inject(ProductsService);
    const createFeedbackComponent = inject(CreateFeedbackComponent);
    const router = inject(Router);
    const route = inject(ActivatedRouteSnapshot);

    const userID = authService.getCurrentUserID();
    const feedbackID = route.paramMap.get('id');

    if (userID && feedbackID) {
        return productsService.getPostById$(feedbackID!).pipe(
            map(res => res.feedback.author),
            map(authorID => {
                (userID === authorID) ? true : router.navigate(['/login']);
            })
        )
    } else {
        router.navigate(['/login']);
        return false;
    }
};