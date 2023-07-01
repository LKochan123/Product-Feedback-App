import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authenticationGuard } from './guards/authentication.guard';
import { authorizationGuard } from './guards/authorization.guard';
import { FeedbackIdComponent } from './pages/feedback-id/feedback-id.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ActivatedRouteSnapshot } from '@angular/router';

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