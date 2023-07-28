import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { map, tap } from 'rxjs';

export const roleGuard = (...allowedRoles: UserRoleEnum[]) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const currUserRole = authService.getCurrentUserRole();

  return currUserRole.pipe(
    map(role => allowedRoles.includes(role)),

    //Tutaj jest bład logiczny
    //
    tap(isModerator => (isModerator ? true : null))
  );
};
