import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "../models/post.model";

@Pipe({
    name: "suggestionFilter"
})
export class SuggestionPipe implements PipeTransform {
    transform(feedbacksArr: Post[], statusName: string) {
        if (!feedbacksArr || !statusName) {
            return feedbacksArr;
        }
        return feedbacksArr.filter(feedback => feedback.status === statusName);
    }
}