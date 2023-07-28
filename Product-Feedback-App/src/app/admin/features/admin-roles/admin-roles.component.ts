import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { UserStatusEnum } from 'src/app/shared/models/enums/user-status';
import { User } from 'src/app/shared/models/interfaces/user.model';
import { AdminRoleDialogComponent } from '../../components/admin-role-dialog/admin-role-dialog.component';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-roles',
  templateUrl: 'admin-roles.component.html',
})
export class AdminRolesComponent implements OnInit {
  currUsers$!: Observable<User[]>;
  selectedOption: UserRoleEnum.USER | UserRoleEnum.MODERATOR = UserRoleEnum.USER;

  readonly UserRoleEnum = UserRoleEnum;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    //to nie musi być w inicie - mozesz to od razu przypisac w polu.
    this.currUsers$ = this.onlyUsers(UserStatusEnum.ACTIVE, this.selectedOption);
  }

  //handleRadioValueChange() ? getUsers() ?
  onCurrRadioVal() {
    this.currUsers$ = this.onlyUsers(UserStatusEnum.ACTIVE, this.selectedOption);
  }

  //Mowmy, co robi metoda, kiedy jest to mozliwe - openChangeRoleDialog().
  onOpenDialog(username: string, currentRole: UserRoleEnum, id: string) {
    this.dialog.open(AdminRoleDialogComponent, {
      width: '320px',
      data: { username, currentRole, id },
    });
  }

  //Kiepska nazwa metody, nie jestem w stanie wywnioskować co robi, na podstawie nazwy. Jakies fetchUsersAccordingToRole()?
  private onlyUsers(status: UserStatusEnum, role: UserRoleEnum) {
    return this.adminService.getUsersByStatus(status, role).pipe(map(res => res.users));
  }

  //Zrefaktorowalem tak, ze ta metoda nie jest potrzebna
  // private checkCurrentRole() {
  //   return this.selectedOption === 'users' ? UserRoleEnum.USER : UserRoleEnum.MODERATOR;
  // }
}
