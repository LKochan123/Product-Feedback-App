import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authenticationGuard } from './guards/authentication.guard';
import { roleGuard } from './guards/role.guard';
import { FeedbackIdComponent } from './pages/feedback-id/feedback-id.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminStatusComponent } from './components/admin/admin-status/admin-status.component';
import { UserStatusEnum } from './models/enums/user-status';
import { UserRoleEnum } from './models/enums/user-role';
import { AdminRolesComponent } from './components/admin/admin-roles/admin-roles.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authenticationGuard, () => roleGuard(UserRoleEnum.MODERATOR, UserRoleEnum.ADMIN)],
    children: [
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
    ],
  },
  { path: 'feedback/:id', component: FeedbackIdComponent },
  { path: 'roadmap', component: RoadmapComponent },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
