import { CategoryTagEnum } from '../enums/category-tag';

export interface FeedbackDetails {
  _id: string;
  title: string;
  description: string;
  category: CategoryTagEnum;
}
