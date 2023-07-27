import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReturnHomeComponent } from './return-home.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [ReturnHomeComponent],
  exports: [ReturnHomeComponent],
})
export class ReturnHomeModule {}
