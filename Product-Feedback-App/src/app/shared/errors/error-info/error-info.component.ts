import { Component } from '@angular/core';

@Component({
  selector: 'app-error-info',
  template: `
    <div class="bg-rose-100 text-rose-500 w-full text-center p-5 my-5">
      <h3 class="text-base font-medium">Something went wrong!</h3>
      <p class="text-sm">Check your connection or try to reload the page.</p>
    </div>
  `,
})
export class ErrorInfoComponent {}
