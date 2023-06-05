import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationComponent } from './components/nav/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { RoadmapComponent } from './components/nav/roadmap/roadmap.component';
import { TagsComponent } from './components/nav/tags/tags.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    HeaderComponent,
    RoadmapComponent,
    TagsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
