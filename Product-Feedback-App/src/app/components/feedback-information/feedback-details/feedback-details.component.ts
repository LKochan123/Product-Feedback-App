import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-feedback-details',
    templateUrl: './feedback-details.component.html',
    styleUrls: ['./feedback-details.component.css']
})
export class FeedbackDetailsComponent {
  @Input() status!: string;
  @Input() feedbackDetails!: {
    title: string,
    description: string,
    category: string
  }

  roadmapStatus = ['Planned', 'In-Progress', 'Live'];
}