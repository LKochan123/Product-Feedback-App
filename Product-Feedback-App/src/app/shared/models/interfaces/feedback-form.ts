import { CategoryTagEnum } from '../enums/category-tag';
import { StatusEnum } from '../enums/status';

export interface FeedbackForm {
  title: string | undefined;
  category: CategoryTagEnum | undefined;
  status: StatusEnum | undefined;
  detail: string | undefined;
}
