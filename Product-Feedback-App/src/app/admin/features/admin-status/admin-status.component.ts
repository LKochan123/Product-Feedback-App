import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/interfaces/user.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserStatusEnum } from 'src/app/shared/models/enums/user-status';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-status',
  templateUrl: 'admin-status.component.html',
})
export class AdminStatusComponent implements OnInit {
  users$!: Observable<{ users: User[]; occurance: number }>;
  section!: UserStatusEnum;
  searchData = '';

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //Czemu to jest w onInit?
    this.section = this.route.snapshot.data['section'];
    this.loadUsersByStatus(this.section);
  }

  onChangeStatus(id: string, currStatus: UserStatusEnum) {
    this.adminService.changeUserStatus(id, currStatus);
  }

  private loadUsersByStatus(status: UserStatusEnum) {
    this.users$ = this.adminService.getUsersByStatus(status, UserRoleEnum.USER);
  }
}
