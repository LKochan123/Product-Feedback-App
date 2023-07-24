import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
})
export class CommentDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
    }
  ) {}
}
