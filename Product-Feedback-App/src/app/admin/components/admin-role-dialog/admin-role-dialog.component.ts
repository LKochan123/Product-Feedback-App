import { Component, Inject } from '@angular/core';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';

//AdminRoleDialogComponent nic nie mowi - AdminChangeRoleDialogComponent juz tak
@Component({
  templateUrl: './admin-role-dialog.component.html',
})
export class AdminRoleDialogComponent {
  //to bylo na inicie - zmienilem, bo niepotrzebnie
  futureRole: UserRoleEnum = this.getFutureRole(this.data.currentRole);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
      currentRole: UserRoleEnum;
      id: string;
    },
    private adminService: AdminService
  ) {}

  onChangeRole(id: string, role: UserRoleEnum) {
    this.adminService.changeUserRole(id, role);
  }

  //Od takich rzeczy mamy pajpy!
  private getFutureRole(role: UserRoleEnum) {
    return role === UserRoleEnum.USER ? UserRoleEnum.MODERATOR : UserRoleEnum.USER;
  }
}
