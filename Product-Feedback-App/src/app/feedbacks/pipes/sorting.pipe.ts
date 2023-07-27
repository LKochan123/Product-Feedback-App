import { Pipe, PipeTransform } from '@angular/core';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';
import { SortingFeedbackEnum } from 'src/app/shared/models/enums/sorting-feedback';

@Pipe({
  name: 'sortFeedbacks',
})
export class SortingFeedbacksPipe implements PipeTransform {
  transform(feedbacksArr: Feedback[], method: SortingFeedbackEnum) {
    const copyArr = [...feedbacksArr];
    switch (method) {
      case SortingFeedbackEnum.MOST_UPVOTES:
        return copyArr.sort(this.ascendingUpvotes).slice().reverse();
      case SortingFeedbackEnum.LEAST_UPVOTES:
        return copyArr.sort(this.ascendingUpvotes);
      case SortingFeedbackEnum.MOST_COMMENTS:
        return copyArr.sort(this.ascendingComments).slice().reverse();
      case SortingFeedbackEnum.LEAST_COMMENTS:
        return copyArr.sort(this.ascendingComments);
      default:
        return copyArr;
    }
  }

  private ascendingComments(a: Feedback, b: Feedback) {
    return a.comments.length - b.comments.length;
  }

  private ascendingUpvotes(a: Feedback, b: Feedback) {
    return a.upvotes.length - b.upvotes.length;
  }
}
