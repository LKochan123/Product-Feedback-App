import { Component } from '@angular/core';
import { map } from 'rxjs';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { AuthService } from 'src/app/auth/services/auth.service';

//zrefaktorowalem ten komponent.
//po pierwsze mozemy skorzystac z deklaratywnego kodu - mowimy, ze isAdmin$ to observable z booleanem
//w templatce sie subskrybujemy na to
//znacznie czysciej to wyglada imo
@Component({
  selector: 'app-admin-nav',
  templateUrl: 'admin-nav.component.html',
})
export class AdminNavComponent {
  isAdmin$ = this.authService.getCurrentUserRole().pipe(map(role => role === UserRoleEnum.ADMIN));

  constructor(private authService: AuthService) {}
}
