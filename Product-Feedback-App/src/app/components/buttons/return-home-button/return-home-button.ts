import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-return-home-button',
  template: `
    <a routerLink="/" class="inline-flex">
      <i class="text-blue text-sm fa-solid fa-arrow-left"></i>
      <p class="text-dark-blue text-sm ml-2 md:ml-3">
        {{ buttonText }}
      </p>
    </a>
  `,
})
export class ReturnHomeButtonComponent {
  @Input() buttonText!: string;
}
