import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-component',
  template: `
    <div class="p-5 rounded-md">
      <p class="text-green-500 font-medium text-sm">{{ data.text }}</p>
    </div>
  `,
  styleUrls: ['./popup.component.css'],
})
export class PopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      text: string;
    }
  ) {}
}
