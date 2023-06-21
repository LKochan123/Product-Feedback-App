import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-upvotes-button-vertical',
    template: `
    <div
    (click)="onUpvotesButton()"
    [ngClass]="isClicked ? 'bg-blue' : 'bg-light-blue'" 
    class="upvotes-button flex flex-col items-center 
    px-3 py-2 text-sm rounded-lg">
        <i
            [ngClass]="isClicked ? 'text-white' : 'text-blue'"  
            class="fa-solid fa-arrow-up">
        </i>
        <p
            [ngClass]="isClicked ? 'text-white' : 'text-dark-blue'" 
            class="mt-1">{{ upvotes }}
        </p>
    </div>
    `,
    styleUrls: ['./upvotes-button.component.css']
})
export class UpvotesButtonVerticalComponent {
    @Input() upvotes!: number;
    isClicked = false;

    onUpvotesButton() {
        this.upvotes = this.isClicked ? this.upvotes - 1 : this.upvotes + 1;
        this.isClicked = !this.isClicked;
    }
}