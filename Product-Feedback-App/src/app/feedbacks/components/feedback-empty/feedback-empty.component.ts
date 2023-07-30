import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-empty-feedback',
  templateUrl: './feedback-empty.component.html',
})
export class FeedbackEmptyComponent {
  isAuthenticated = this.authService.isAuthenticated;

  constructor(private authService: AuthService) {}
}
