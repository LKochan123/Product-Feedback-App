import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comment-dialog',
  template: `
    <div class="p-5">
      <h3 mat-dialog-title class="text-base">Comment reply</h3>
      <div mat-dialog-content>
        <p class="text-sm">Comment reply to {{ data.username }} will be implemented in future!</p>
      </div>
      <div mat-dialog-actions>
        <button
          mat-dialog-close
          class="bg-rose-500 hover:bg-rose-400 w-full text-white transition-colors px-2 py-1 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  `,
})
export class CommentDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
    }
  ) {}
}
