import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment-icon',
  templateUrl: './comment-icon.component.html',
})
export class CommentIconComponent {
  @Input() comments!: number; //Zmieniłbym na np. commentsCount, numberOfComments, cokolwiek, bo obecna nazwa sugeruje, ze bedzie caly comment tutaj.
}
