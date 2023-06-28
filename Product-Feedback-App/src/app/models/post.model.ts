import { CategoryTagEnum } from "./enums/category-tag";

export interface Post {
    _id: string;
    author: string,
    title: string;
    category: CategoryTagEnum;
    upvotes: string[];
    status: string;
    description: string;
    comments: []
}