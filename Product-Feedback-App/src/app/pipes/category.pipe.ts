import { Pipe, PipeTransform } from '@angular/core';
import { Post } from '../models/post.model';
import { CategoryTagEnum } from '../models/enums/category-tag';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryPipe implements PipeTransform {
  transform(feedbacksArr: Post[], category: CategoryTagEnum) {
    if (!feedbacksArr || category === CategoryTagEnum.ALL) return feedbacksArr;
    return feedbacksArr.filter(feedback => feedback.category === category);
  }
}
