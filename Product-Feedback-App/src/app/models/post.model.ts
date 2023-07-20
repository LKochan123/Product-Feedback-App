import { CategoryTagEnum } from './enums/category-tag';

export interface Post {
  _id: string; // Po co id ma podłogę?
  author: string;
  title: string;
  category: CategoryTagEnum;
  upvotes: string[];
  status: string; // Statusy, o ile mają skończoną pulę opcji, powinny być enumem
  description: string;
  comments: [];
}
