import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [MatProgressSpinnerModule, MatDialogModule],
  declarations: [],
  exports: [MatProgressSpinnerModule, MatDialogModule],
})
export class AngularMaterialModule {}
//Nie powinienes robic takich modulow - po to kazdy ficzer materialowy jest jako osobny modul, zeby zawsze importowac tylko to czego potrzebujesz.
//Mozesz sadzic, ze wiesz, ze na ten moment w X miejscach w kodzie potrzebujesz importowac dokladnie Y tych samych modulow z Materiala.
//To jednak moze zmienic sie bardzo szybko i nagle zaczniesz korzystac hybrydy - bedziesz dodawac ten modul + moduly materialowe, ktore potrzebujesz,
//albo co gorsza bedziesz importowal caly taki modul, ktory bedzie zawieral moduly, ktorych w danym rozwiazaniu nie potrzebujesz.
