import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-no-comment',
  template: `
    <div class="flex flex-col items-center bg-white px-5 mb-4 rounded-lg py-12">
      <img
        src="/assets/shared/other/illustration-empty.svg"
        alt="Bird with magnyfing glass"
        class="mb-3" />
      <h3 class="text-dark-blue text-lg my-4 font-semibold">There is no comments yet.</h3>
      <p class="text-gray text-center text-sm mb-5 max-w-xs">
        If you have an idea, you are welcome to add one!
      </p>
      <app-login-button *ngIf="!isAuthenticated"></app-login-button>
    </div>
  `,
})
export class CommentEmptyComponent {
  isAuthenticated = this.authService.isAuthenticated;

  constructor(private authService: AuthService) {}
}
