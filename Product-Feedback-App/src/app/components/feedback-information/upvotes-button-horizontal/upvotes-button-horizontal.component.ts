import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-upvotes-button-horizontal',
    templateUrl: './upvotes-button-horizontal.component.html'
})
export class UpvotesButtonHorizontalComponent {
    @Input() upvotes!: number;
}