import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavRoadmapComponent } from './nav-roadmap/nav-roadmap.component';
import { NavTagsComponent } from './nav-tags/nav-tags.component';
import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavRoadmapComponent, NavTagsComponent, NavComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavRoadmapComponent, NavTagsComponent, NavComponent],
})
export class NavModule {}
