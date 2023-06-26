import { Comment } from "./comment.model";

export interface Post {
    _id: string;
    author: string,
    title: string;
    category: string;
    upvotes: string[];
    status: string;
    description: string;
    comments: []
}