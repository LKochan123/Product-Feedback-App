import { Component } from '@angular/core';

@Component({
    selector: 'app-add-feedback-button',
    template: `
    <button
        routerLink="/create-feedback" 
        type="button" 
        class="text-sm text-white bg-purple py-2 px-3 md:px-4 rounded-md">
        + Add Feedback
    </button>
    `
})
export class AddFeedbackButtonComponent {
    
}