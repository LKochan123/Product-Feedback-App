import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth.guard';
import { FeedbackIdComponent } from './pages/feedback-id/feedback-id.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { 
        path: 'create-feedback', 
        component: CreateFeedbackComponent, 
        canActivate: [authGuard] 
    },
    { 
        path: 'edit-feedback/:id', 
        component: CreateFeedbackComponent, 
        canActivate: [authGuard] 
    }, 
    { path: 'feedback/:id', component: FeedbackIdComponent },
    { path: 'roadmap', component: RoadmapComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'login', component: LoginComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}