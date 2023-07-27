import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { roleGuard } from './admin/guards/role.guard';
import { authenticationGuard } from './auth/guards/authentication.guard';
import { UserRoleEnum } from './shared/models/enums/user-role';
import { FeedbackHomeComponent } from './feedbacks/features/feedback-home/feedback-home.component';
import { FeedbackRoadmapComponent } from './feedbacks/features/feedback-roadmap/feedback-roadmap.component';
import { FeedbackIdComponent } from './feedbacks/features/feedback-id/feedback-id.component';
import { AdminMainComponent } from './admin/features/admin-main/admin.component';
import { Error404Component } from './shared/errors/error-404/error-404.component';

const appRoutes: Routes = [
  { path: '', component: FeedbackHomeComponent },
  { path: 'roadmap', component: FeedbackRoadmapComponent },
  { path: 'feedback/:id', component: FeedbackIdComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'admin',
    component: AdminMainComponent,
    canActivate: [authenticationGuard, () => roleGuard(UserRoleEnum.MODERATOR, UserRoleEnum.ADMIN)],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
