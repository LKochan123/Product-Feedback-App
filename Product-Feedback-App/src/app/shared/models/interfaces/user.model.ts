import { UserRoleEnum } from '../enums/user-role';
import { UserStatusEnum } from '../enums/user-status';

export interface User {
  _id: string;
  username: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  email: string;
}
