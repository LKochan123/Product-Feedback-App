import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateFeedbackComponent } from './pages/create-feedback/create-feedback.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'create-feedback', component: CreateFeedbackComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}