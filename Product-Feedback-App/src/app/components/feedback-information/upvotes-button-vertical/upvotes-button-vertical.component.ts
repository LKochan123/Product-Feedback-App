import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-upvotes-button-vertical',
    templateUrl: './upvotes-button-vertical.component.html'
})
export class UpvotesButtonVerticalComponent {
    @Input() upvotes!: number;
}