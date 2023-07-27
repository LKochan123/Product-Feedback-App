import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-upvotes-button-horizontal',
  template: `
    <div
      (click)="onUpvotesButton()"
      [ngClass]="isClicked ? 'bg-blue' : 'bg-light-blue'"
      class="upvotes-button flex flex-row items-center px-3 py-2 text-xs rounded-lg">
      <i [ngClass]="isClicked ? 'text-white' : 'text-blue'" class="fa-solid fa-arrow-up"> </i>
      <p [ngClass]="isClicked ? 'text-white' : 'text-dark-blue'" class="pl-2">
        {{ upvotesDetail.upvotes.length }}
      </p>
    </div>
  `,
  styleUrls: ['./upvotes-button.component.css'],
})
export class UpvotesButtonHorizontalComponent implements OnInit {
  @Input() upvotesDetail!: { _id: string; upvotes: string[] };
  isClicked!: boolean;
  userID!: string | null;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.userID = this.authService.currentUserID;

    this.feedbackService
      .getFeedbackById$(this.upvotesDetail._id)
      .pipe(
        map(response => response.feedback.upvotes),
        map(upvotesArr => upvotesArr.includes(this.userID!))
      )
      .subscribe(isUpvoted => {
        this.isClicked = isUpvoted;
      });
  }

  onUpvotesButton() {
    if (this.authService.isAuthenticated) {
      if (this.isClicked) {
        this.upvotesDetail.upvotes.length -= 1;
        this.feedbackService.upvotesOnFeedback(this.upvotesDetail._id);
      } else {
        this.upvotesDetail.upvotes.length += 1;
        this.feedbackService.upvotesOnFeedback(this.upvotesDetail._id);
      }

      this.isClicked = !this.isClicked;
    }
  }
}
