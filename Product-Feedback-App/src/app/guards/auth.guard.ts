import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

export const authGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    authService.getIsAuthenticated() ? true : router.navigate(['/login']);
};