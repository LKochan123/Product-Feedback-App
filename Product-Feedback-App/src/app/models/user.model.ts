import { UserRoleEnum } from './enums/user-role';
import { UserStatusEnum } from './enums/user-status';

export interface User {
  _id: string;
  username: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
  email: string;
  password?: string; // Jezeli jest sytuacja gdzie pobierasz usera razem z jego haslem, to imo nie powinno byc takiej sytuacji :D
}
