import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-feedback-button',
  template: `
    <button
      (click)="onAddFeedback()"
      type="button"
      class="text-sm text-white bg-purple py-2 px-3 md:px-4 rounded-md hover:opacity-80 transition-opacity duration-300">
      + Add Feedback
    </button>
  `,
})
export class AddFeedbackButtonComponent {
  constructor(private productsService: ProductsService) {}

  onAddFeedback() {
    this.productsService.openDialog(false, null);
  }
}
