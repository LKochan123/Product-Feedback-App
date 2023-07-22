import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { UserRoleEnum } from 'src/app/models/enums/user-role';
import { UserStatusEnum } from 'src/app/models/enums/user-status';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';

@Component({
  selector: 'app-admin-roles',
  templateUrl: 'admin-roles.component.html',
})
export class AdminRolesComponent implements OnInit {
  currUsers$!: Observable<User[]>;
  selectedOption: 'users' | 'mods' = 'users';

  constructor(
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currUsers$ = this.onlyUsers(UserStatusEnum.ACTIVE, this.checkCurrentRole());
  }

  onlyUsers(status: UserStatusEnum, role: UserRoleEnum) {
    return this.authService.getUsersByStatus(status, role).pipe(map(res => res.users));
  }

  checkCurrentRole() {
    return this.selectedOption === 'users' ? UserRoleEnum.USER : UserRoleEnum.MODERATOR;
  }

  onCurrRadioVal() {
    this.currUsers$ = this.onlyUsers(UserStatusEnum.ACTIVE, this.checkCurrentRole());
  }

  openDialog(username: string, currentRole: UserRoleEnum, id: string) {
    this.dialog.open(RoleDialogComponent, {
      width: '320px',
      data: { username, currentRole, id },
    });
  }
}
