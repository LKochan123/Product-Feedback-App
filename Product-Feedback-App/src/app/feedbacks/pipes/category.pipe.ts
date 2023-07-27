import { Pipe, PipeTransform } from '@angular/core';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';
import { CategoryTagEnum } from 'src/app/shared/models/enums/category-tag';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryPipe implements PipeTransform {
  transform(feedbacksArr: Feedback[], category: CategoryTagEnum) {
    if (!feedbacksArr || category === CategoryTagEnum.ALL) return feedbacksArr;
    return feedbacksArr.filter(feedback => feedback.category === category);
  }
}
