import { NgModule } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog.component';
import { AngularMaterialModule } from '../../angular-material.module';

@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [AngularMaterialModule],
  exports: [ErrorDialogComponent],
})
export class ErrorDialogModule {}
