import { NgModule } from '@angular/core';
import { PopupComponent } from './popup.component';
import { AngularMaterialModule } from '../../angular-material.module';

@NgModule({
  declarations: [PopupComponent],
  imports: [AngularMaterialModule],
  exports: [PopupComponent],
})
export class PopupModule {}
