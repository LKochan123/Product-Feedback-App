import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-upvotes-button',
    templateUrl: './upvotes-button.component.html'
})
export class UpvotesButtonComponent {
    @Input() upvotes!: number;
}