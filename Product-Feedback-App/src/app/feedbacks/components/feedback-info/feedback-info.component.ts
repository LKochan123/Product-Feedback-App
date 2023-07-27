import { Component, Input } from '@angular/core';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';

@Component({
  selector: 'app-feedback-information',
  templateUrl: './feedback-info.component.html',
})
export class FeedbackInfoComponent {
  @Input() feedback!: Feedback;
}
