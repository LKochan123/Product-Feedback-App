import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-feedback',
  templateUrl: './feedback-empty.component.html',
})
export class FeedbackEmptyComponent {
  @Input() isAuthenticated!: boolean;
}
