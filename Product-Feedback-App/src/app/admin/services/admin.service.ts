import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environemnt } from 'src/environments/environment';
import { UserStatusEnum } from 'src/app/shared/models/enums/user-status';
import { UserRoleEnum } from 'src/app/shared/models/enums/user-role';
import { map } from 'rxjs';
import { UsersResponse } from 'src/app/shared/models/interfaces/users-response';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = environemnt.apiUrl + 'user/';

  constructor(private http: HttpClient) {}

  getUsersByStatus(status: UserStatusEnum, role: UserRoleEnum) {
    const query = `?status=${status}&role=${role}`;
    return this.http
      .get<UsersResponse>(this.url + query)
      .pipe(map(res => ({ users: res.users, occurance: res.occurance })));
  }

  changeUserStatus(id: string, currStatus: UserStatusEnum) {
    const status = this.getUserFutureStatus(currStatus);
    this.http.patch<{ message: string }>(this.url + 'status/' + id, status).subscribe(() => {
      window.location.reload();
    });
  }

  changeUserRole(id: string, currRole: UserRoleEnum) {
    const role = this.getUserFutureRole(currRole);
    this.http.patch<{ message: string }>(this.url + 'role/' + id, role).subscribe(() => {
      window.location.reload();
    });
  }

  private getUserFutureStatus(currStatus: UserStatusEnum): { status: UserStatusEnum } {
    return {
      status: currStatus === UserStatusEnum.ACTIVE ? UserStatusEnum.BANNED : UserStatusEnum.ACTIVE,
    };
  }

  private getUserFutureRole(currRole: UserRoleEnum): { role: UserRoleEnum } {
    return { role: currRole === UserRoleEnum.USER ? UserRoleEnum.MODERATOR : UserRoleEnum.USER };
  }
}
