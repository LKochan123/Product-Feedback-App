import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackFormComponent } from '../../feedback-form/feedback-form.component';

@Component({
    selector: 'app-add-feedback-button',
    template: `
    <button
        (click)="onAddFeedback()"
        type="button" 
        class="text-sm text-white bg-purple py-2 px-3 md:px-4 rounded-md hover:opacity-80 transition-opacity duration-300">
        + Add Feedback
    </button>
    `
})
export class AddFeedbackButtonComponent {

    constructor(private dialog: MatDialog) { }

    onAddFeedback() {
        this.dialog.open(FeedbackFormComponent, {
            minWidth: '300px',
            data: { 
                isEditingPost: false,
                id: null
            }
        });
    }
}