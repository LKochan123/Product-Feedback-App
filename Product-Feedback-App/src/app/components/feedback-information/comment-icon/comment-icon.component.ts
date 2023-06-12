import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-comment-icon',
    templateUrl: './comment-icon.component.html'
})
export class CommentIconComponent {
  @Input() comments!: number;
}