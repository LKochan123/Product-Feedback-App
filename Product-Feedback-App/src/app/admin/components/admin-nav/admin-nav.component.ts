import { Component } from '@angular/core';
import { map } from 'rxjs';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: 'admin-nav.component.html',
})
export class AdminNavComponent {
  isAdmin$ = this.authService.getCurrentUserRole().pipe(map(role => role === UserRoleEnum.ADMIN));

  constructor(private authService: AuthService) {}
}
