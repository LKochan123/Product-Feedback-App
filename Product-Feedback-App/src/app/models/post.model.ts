import { Comment } from "./comment.model";

export interface Post {
    _id: string;
    title: string;
    category: string;
    upvotes: number;
    status: string;
    description: string;
    comments?: Comment[]
}