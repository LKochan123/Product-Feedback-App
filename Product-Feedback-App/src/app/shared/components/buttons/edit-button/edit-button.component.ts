import { Component, Input } from '@angular/core';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';

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

  onEditFeedback() {
    this.feedbackService.openDialog(this.feedbackID);
  }
}
