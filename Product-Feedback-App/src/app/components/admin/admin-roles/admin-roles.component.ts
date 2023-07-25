import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { UserRoleEnum } from 'src/app/models/enums/user-role';
import { UserStatusEnum } from 'src/app/models/enums/user-status';
import { User } from 'src/app/models/interfaces/user.model';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin-roles',
  templateUrl: 'admin-roles.component.html',
})
export class AdminRolesComponent implements OnInit {
  currUsers$!: Observable<User[]>;
  selectedOption: 'users' | 'mods' = 'users';

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.currUsers$ = this.onlyUsers(UserStatusEnum.ACTIVE, this.checkCurrentRole());
  }

  onCurrRadioVal() {
    this.currUsers$ = this.onlyUsers(UserStatusEnum.ACTIVE, this.checkCurrentRole());
  }

  onOpenDialog(username: string, currentRole: UserRoleEnum, id: string) {
    this.dialog.open(RoleDialogComponent, {
      width: '320px',
      data: { username, currentRole, id },
    });
  }

  private onlyUsers(status: UserStatusEnum, role: UserRoleEnum) {
    return this.adminService.getUsersByStatus(status, role).pipe(map(res => res.users));
  }

  private checkCurrentRole() {
    return this.selectedOption === 'users' ? UserRoleEnum.USER : UserRoleEnum.MODERATOR;
  }
}
