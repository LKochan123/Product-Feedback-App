import { Component, Input } from '@angular/core';
import { FeedbackDetails } from 'src/app/shared/models/interfaces/feedback-details';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
})
export class FeedbackDetailsComponent {
  @Input() feedbackDetails!: FeedbackDetails;
}
