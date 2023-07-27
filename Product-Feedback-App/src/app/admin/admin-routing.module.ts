import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { roleGuard } from './guards/role.guard';
import { AdminStatusComponent } from './features/admin-status/admin-status.component';
import { UserStatusEnum } from '../shared/models/enums/user-status';
import { AdminRolesComponent } from './features/admin-roles/admin-roles.component';
import { UserRoleEnum } from '../shared/models/enums/user-role';

const routes: Routes = [
  { path: '', redirectTo: 'active-users', pathMatch: 'full' },
  {
    path: 'active-users',
    component: AdminStatusComponent,
    data: { section: UserStatusEnum.ACTIVE },
  },
  {
    path: 'banned-users',
    component: AdminStatusComponent,
    data: { section: UserStatusEnum.BANNED },
  },
  {
    path: 'roles',
    component: AdminRolesComponent,
    canActivate: [() => roleGuard(UserRoleEnum.ADMIN)],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
