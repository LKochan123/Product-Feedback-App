import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-upvotes-button-horizontal',
    template: `
    <div 
    (click)="onUpvotesButton()"
    [ngClass]="isClicked ? 'bg-blue' : 'bg-light-blue'" 
    class="upvotes-button flex flex-row items-center 
    px-3 py-2 text-xs rounded-lg">
        <i 
            [ngClass]="isClicked ? 'text-white' : 'text-blue'" 
            class="fa-solid fa-arrow-up">
        </i>
        <p 
            [ngClass]="isClicked ? 'text-white' : 'text-dark-blue'"
            class="pl-2">{{ upvotes }}
        </p>
    </div>
    `,
    styleUrls: ['./upvotes-button.component.css']
})
export class UpvotesButtonHorizontalComponent {
    @Input() upvotes!: number;
    isClicked = false;

    onUpvotesButton() {
        this.upvotes = this.isClicked ? this.upvotes - 1 : this.upvotes + 1;
        this.isClicked = !this.isClicked;
    }
}