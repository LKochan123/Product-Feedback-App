import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [DropdownMenuComponent, TruncatePipe],
  imports: [CommonModule, RouterModule],
  exports: [DropdownMenuComponent],
})
export class DropdownMenuModule {}
