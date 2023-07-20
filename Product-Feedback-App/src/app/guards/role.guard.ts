import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRoleEnum } from '../models/enums/user-role';
import { map, tap } from 'rxjs';

//nie zaszkodziłoby otypować co zwraca funkcja
export const roleGuard = (...allowedRoles: UserRoleEnum[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currUserRole = authService.getCurrentUserRole();

  return currUserRole.pipe(
    map((role) => allowedRoles.includes(role)),
    tap((isModerator) => (isModerator ? true : router.navigate(['/'])))
  );
};
