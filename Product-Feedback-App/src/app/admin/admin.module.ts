import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { AdminRoutingModule } from './admin-routing.module';

import { SearchUserPipe } from './pipes/serach-user.pipe';

import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { AdminRoleDialogComponent } from './components/admin-role-dialog/admin-role-dialog.component';
import { AdminRolesComponent } from './features/admin-roles/admin-roles.component';
import { FormsModule } from '@angular/forms';
import { AdminStatusComponent } from './features/admin-status/admin-status.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { AdminMainComponent } from './features/admin-main/admin.component';

@NgModule({
  declarations: [
    SearchUserPipe,
    AdminNavComponent,
    AdminRoleDialogComponent,
    AdminRolesComponent,
    AdminStatusComponent,
    AdminMainComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularMaterialModule,
    AdminRoutingModule,
    HeaderModule,
  ],
})
export class AdminModule {}
