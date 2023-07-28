import { NgModule } from '@angular/core';
import { EditButtonComponent } from './edit-button.component';

//Gdybyś zrobił standalone component, to nie potrzebowałbyś w ogóle tego pliku.
@NgModule({
  declarations: [EditButtonComponent],
  imports: [],
  exports: [EditButtonComponent],
})
export class EditButtonModule {}
