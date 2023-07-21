import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackFormComponent } from '../../feedback-form/feedback-form.component';

@Component({
    selector: 'app-edit-button',
    template: `
    <button
        (click)="onEditFeedback()"
        type="button" 
        class="bg-blue text-white text-sm px-3 md:px-4 py-2 rounded-md cursor-pointer">
        Edit Feedback
    </button>
    `
})
export class EditButtonComponent {
    @Input() feedbackID!: string | null;

    constructor(private dialog: MatDialog) { }

    onEditFeedback() {
        this.dialog.open(FeedbackFormComponent, {
            minWidth: '300px',
            data: { isEditingPost: true, id: this.feedbackID }
        });
    }
}