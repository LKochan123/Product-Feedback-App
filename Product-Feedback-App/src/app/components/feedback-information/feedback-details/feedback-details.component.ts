import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-feedback-details',
    templateUrl: './feedback-details.component.html'
})
export class FeedbackDetailsComponent {
  @Input() feedbackDetails!: {
    _id: string,
    title: string,
    description: string,
    category: string
  }
}