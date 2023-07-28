import { Component, Input } from '@angular/core';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';

//Tutaj mamy przykład trochę źle zrozumianej kwestii tego, co powinno być w shared i w jakiej formie.
//Po pierwsze button jest elementem UI i rzeczywiście uzywamy buttonow na przestrzeni calego projektu.
//Taki button nie powinien jednak NIGDY posiadac dodatkowych funkcjonalnosci, ktore sprawialyby, ze przestaje byc DUMB.
//Wynika to z faktu, ze przestaje byc wtedy reuzywalny. Dodatkowo dodajemy mu logike, ktora jest zwiazana z jakas domena.
//Np tutaj jest to domena nawigacji.
//Konkludujac, jezeli chcemy miec jakies shared rozwiazanie dla buttona, to zazwyczaj tylko po to, zeby nadac mu okreslone style.
//W takim wypadku nie potrzebujemy komponentu tez, a jedynie dyrektywe, ktora nalozy style.
//Dzieki temu tez zachowujemy na wierzchu w kodzie element <button> co poprawia readability.
@Component({
  selector: 'app-edit-button',
  template: `
    <button
      (click)="onEditFeedback()"
      type="button"
      class="bg-blue text-white text-sm px-3 md:px-4 py-2 rounded-md cursor-pointer">
      Edit Feedback
    </button>
  `,
})
export class EditButtonComponent {
  @Input() feedbackID!: string | null;

  constructor(private feedbackService: FeedbackService) {}

  // Jezeli mozesz, to nazywaj metody tak, zeby mowily co robia.
  //Tutaj mogloby sie to nazywac openEditFormDialog()
  //Czasami sie tak nie da, bo np. definiujemy w interfejsie metode, ktora bedzie robic rozne rzeczy w zaleznosci od implementacji.
  //ale jak sie da to warto, byc jak najbardziej precyzyjnym.
  onEditFeedback() {
    this.feedbackService.openDialog(this.feedbackID);
  }
}
