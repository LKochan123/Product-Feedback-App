import { Feedback } from './feedback.model';

export interface FeedbacksResponse {
  message: string;
  feedbacks: Feedback[];
  occurance: number;
}
