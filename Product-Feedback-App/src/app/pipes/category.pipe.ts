import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "../models/post.model";

@Pipe({
    name: "categoryFilter"
})
export class CategoryPipe implements PipeTransform {
    transform(feedbacksArr: Post[], category: string | null) {
        if (!feedbacksArr || category === 'ALL' || category === null) {
            return feedbacksArr;
        }
        return feedbacksArr.filter(feedback => feedback.category === category);
    }
}