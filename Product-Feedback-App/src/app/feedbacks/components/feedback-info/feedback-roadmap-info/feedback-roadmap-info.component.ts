import { Component, Input } from '@angular/core';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';

@Component({
  selector: 'app-feedback-roadmap-info',
  templateUrl: './feedback-roadmap-info.component.html',
  styleUrls: ['./feedback-roadmap-info.component.css'],
})
export class FeedbackRoadmapInfoComponent {
  @Input() feedbackArr: Feedback[] = [];
  @Input() isLoading!: boolean;
}
