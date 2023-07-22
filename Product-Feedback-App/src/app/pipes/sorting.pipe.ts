import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post.model';
import { SortingFeedbackEnum } from '../models/enums/sorting-feedback';

@Pipe({
  name: 'sortFeedbacks',
})
export class SortingFeedbacksPipe implements PipeTransform {
  transform(feedbacksArr: Post[], method: SortingFeedbackEnum) {
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

  private ascendingComments(a: Post, b: Post) {
    return a.comments.length - b.comments.length;
  }

  private ascendingUpvotes(a: Post, b: Post) {
    return a.upvotes.length - b.upvotes.length;
  }
}
