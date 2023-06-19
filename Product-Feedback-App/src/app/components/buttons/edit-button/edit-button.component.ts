import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-edit-button',
    template: `
    <button
        [routerLink]="['/', 'edit-feedback', feedbackID]"
        type="button" 
        class="bg-blue text-white text-sm px-3 md:px-4 py-2 rounded-md cursor-pointer">
        Edit Feedback
    </button>
    `
})
export class EditButtonComponent {
    @Input() feedbackID!: string;
}