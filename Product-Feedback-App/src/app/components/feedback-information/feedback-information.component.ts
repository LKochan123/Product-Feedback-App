import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-feedback-information',
  templateUrl: './feedback-information.component.html',
})
export class FeedbackInformationComponent {
  @Input() feedback!: Post;

  ngOnInit() {
    //Pusty on Init
  }
}
