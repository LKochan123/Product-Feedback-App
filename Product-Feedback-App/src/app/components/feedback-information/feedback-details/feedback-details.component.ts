import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-details',
  templateUrl: './feedback-details.component.html',
})
export class FeedbackDetailsComponent {
  @Input() feedbackDetails!: {
    //Czemu nie masz interfejsu na to?
    _id: string;
    title: string;
    description: string;
    category: string;
  };

  ngOnInit() {
    // nieuzywany onInit
    // console.log(this.feedbackDetails);
  }
}
