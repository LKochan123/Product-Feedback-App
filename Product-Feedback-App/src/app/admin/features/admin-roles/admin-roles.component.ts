import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { UserStatusEnum } from 'src/app/shared/models/enums/user-status';
import { AdminRoleDialogComponent } from '../../components/admin-role-dialog/admin-role-dialog.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-roles',
  templateUrl: 'admin-roles.component.html',
})
export class AdminRolesComponent {
  selectedOption: 'users' | 'mods' = 'users';
  currUsers$ = this.fetchUsersByStatus(UserStatusEnum.ACTIVE, this.checkCurrentRole());

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  onHandleRadioValChange() {
    this.currUsers$ = this.fetchUsersByStatus(UserStatusEnum.ACTIVE, this.checkCurrentRole());
  }

  onOpenDialog(username: string, currentRole: UserRoleEnum, id: string) {
    this.dialog.open(AdminRoleDialogComponent, {
      width: '320px',
      data: { username, currentRole, id },
    });
  }

  private fetchUsersByStatus(status: UserStatusEnum, role: UserRoleEnum) {
    return this.adminService.getUsersByStatus(status, role).pipe(map(res => res.users));
  }

  private checkCurrentRole() {
    return this.selectedOption === 'users' ? UserRoleEnum.USER : UserRoleEnum.MODERATOR;
  }
}
