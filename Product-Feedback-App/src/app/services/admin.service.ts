import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environemnt } from 'src/environments/environment';
import { UserStatusEnum } from '../models/enums/user-status';
import { UserRoleEnum } from '../models/enums/user-role';
import { map } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private url = environemnt.apiUrl + 'user/';

  constructor(private http: HttpClient) {}

  getUsersByStatus(status: UserStatusEnum, role: UserRoleEnum) {
    const query = `?status=${status}&role=${role}`;
    return this.http
      .get<{ message: string; users: User[]; occurance: number }>(this.url + query)
      .pipe(map(res => ({ users: res.users, occurance: res.occurance })));
  }

  changeUserStatus(id: string, currStatus: UserStatusEnum) {
    const status = {
      status: currStatus === UserStatusEnum.ACTIVE ? UserStatusEnum.BANNED : UserStatusEnum.ACTIVE,
    };
    this.http.patch<{ message: string }>(this.url + 'status/' + id, status).subscribe(() => {
      window.location.reload();
    });
  }

  changeUserRole(id: string, currRole: UserRoleEnum) {
    const role = {
      role: currRole === UserRoleEnum.USER ? UserRoleEnum.MODERATOR : UserRoleEnum.USER,
    };
    this.http.patch<{ message: string }>(this.url + 'role/' + id, role).subscribe(() => {
      window.location.reload();
    });
  }
}
