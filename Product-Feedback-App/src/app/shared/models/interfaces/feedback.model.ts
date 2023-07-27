import { CategoryTagEnum } from '../enums/category-tag';
import { StatusEnum } from '../enums/status';

export interface Feedback {
  _id: string;
  author: string;
  title: string;
  category: CategoryTagEnum;
  upvotes: string[];
  status: StatusEnum;
  description: string;
  comments: [];
}
