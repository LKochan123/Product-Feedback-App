import { Pipe, PipeTransform } from '@angular/core';
import { User } from 'src/app/shared/models/interfaces/user.model';

@Pipe({
  name: 'searchUser',
  pure: false,
})
export class SearchUserPipe implements PipeTransform {
  transform(users: User[], data: string) {
    if (data.length) {
      const lowerData = data.toLowerCase();
      return users.filter(
        user =>
          user.username.toLowerCase().startsWith(lowerData) ||
          user.email.toLowerCase().startsWith(lowerData)
      );
    } else {
      return users;
    }
  }
}
