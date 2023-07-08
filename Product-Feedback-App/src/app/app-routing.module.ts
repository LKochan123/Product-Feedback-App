import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authenticationGuard } from './guards/authentication.guard';
import { authorizationGuard } from './guards/authorization.guard';
import { roleGuard } from './guards/role.guard';
import { FeedbackIdComponent } from './pages/feedback-id/feedback-id.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminSectionComponent } from './components/admin/admin-section/admin-section.component';
import { UserStatusEnum } from './models/enums/user-status';
import { UserRoleEnum } from './models/enums/user-role';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { 
        path: 'create-feedback', 
        component: CreateFeedbackComponent, 
        canActivate: [authenticationGuard] 
    },
    { 
        path: 'edit-feedback/:id', 
        component: CreateFeedbackComponent, 
        canActivate: [
            authenticationGuard, 
            (snapshot: ActivatedRouteSnapshot) => authorizationGuard(snapshot)
        ]
    }, 
    { 
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [
            authenticationGuard, 
            () => roleGuard(UserRoleEnum.MODERATOR, UserRoleEnum.ADMIN)
        ],
        children: [
            { path: '', redirectTo: 'active-users', pathMatch: 'full' },
            { path: 'active-users', component: AdminSectionComponent, data: { section: UserStatusEnum.ACTIVE }},
            { path: 'banned-users', component: AdminSectionComponent, data: { section: UserStatusEnum.BANNED }},
            { 
                path: 'moderators',
                component: AdminSectionComponent,
                canActivate: [() => roleGuard(UserRoleEnum.ADMIN)],
                data: { section: 'moderators' } 
            }
        ]
    },
    { path: 'feedback/:id', component: FeedbackIdComponent },
    { path: 'roadmap', component: RoadmapComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: ErrorPageComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}