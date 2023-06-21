import { Comment } from "./comment.model";

export interface Post {
    _id: string;
    title: string;
    category: string;
    upvotes: string[];
    status: string;
    description: string;
    comments?: Comment[]
}