import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRoleEnum } from 'src/app/models/enums/user-role';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: 'admin-nav.component.html',
})
export class AdminNavComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isAdminSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdminSub = this.authService.getCurrentUserRole().subscribe(role => {
      this.isAdmin = role === UserRoleEnum.ADMIN;
    });
  }

  ngOnDestroy(): void {
    this.isAdminSub.unsubscribe();
  }
}
