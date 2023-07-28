import { Component, OnInit, Inject } from '@angular/core';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';

@Component({
  templateUrl: './admin-role-dialog.component.html',
})
export class AdminRoleDialogComponent implements OnInit {
  futureRole!: UserRoleEnum;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
      currentRole: UserRoleEnum;
      id: string;
    },
    private adminService: AdminService
  ) {}

  ngOnInit() {
    const { role } = this.adminService.getUserFutureRole(this.data.currentRole);
    this.futureRole = role;
  }

  onChangeRole(id: string, role: UserRoleEnum) {
    this.adminService.changeUserRole(id, role);
  }
}
