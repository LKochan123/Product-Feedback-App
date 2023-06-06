import { Comment } from "./comment.model";

export interface Post {
    id: number,
    title: string,
    category: string,
    upvotes: number,
    status: string,
    description: string,
    comments?: Comment[]
}