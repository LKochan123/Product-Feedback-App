import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/interfaces/post.model';

@Component({
  selector: 'app-feedback-info-roadmap',
  templateUrl: './feedback-info-roadmap.component.html',
  styleUrls: ['./feedback-info-roadmap.component.css'],
})
export class FeedbackInfoRoadmapComponent {
  @Input() feedbackArr: Post[] = [];
}
