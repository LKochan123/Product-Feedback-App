import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create-feedback', component: CreateFeedbackComponent },
    { path: 'edit-feedback/:id', component: CreateFeedbackComponent }, 
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