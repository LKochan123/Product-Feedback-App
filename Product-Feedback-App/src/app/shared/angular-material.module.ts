import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatProgressSpinnerModule, MatDialogModule],
  declarations: [],
  exports: [MatProgressSpinnerModule, MatDialogModule],
})
export class AngularMaterialModule {}
