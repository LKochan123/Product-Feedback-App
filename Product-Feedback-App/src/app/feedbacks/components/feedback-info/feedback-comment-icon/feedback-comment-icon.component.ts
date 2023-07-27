import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-comment-icon',
  template: `
    <div class="flex flex-row justify-center items-center text-xs md:text-sm">
      <i class="fa-solid fa-comment text-slate-400"></i>
      <p class="pl-2">{{ commentsNumber }}</p>
    </div>
  `,
})
export class FeedbackCommentIconComponent {
  @Input() commentsNumber!: number;
}
