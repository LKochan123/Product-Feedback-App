import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-return-home',
  template: `
    <a routerLink="/" class="inline-flex">
      <i class="text-blue text-sm fa-solid fa-arrow-left"></i>
      <p class="text-dark-blue text-sm ml-2 md:ml-3">
        {{ text }}
      </p>
    </a>
  `,
  standalone: true,
  imports: [RouterModule],
})
export class ReturnHomeComponent {
  @Input() text!: string;
}
