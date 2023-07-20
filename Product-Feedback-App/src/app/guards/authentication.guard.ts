import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Ten guard nic nie zwraca. Chyba nie powinno tak być.
export const authenticationGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.getIsAuthenticated() ? true : router.navigate(['/login']);
};
