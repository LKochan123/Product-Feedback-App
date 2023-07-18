import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-comment-photo',
    template: `
    <div 
        class="flex-shrink-0 flex justify-center items-center w-8 h-8 sm:w-10 sm:h-10 mr-2 md:mr-5 rounded-full"
        [ngClass]="color">
        <p class="text-white text-sm sm:text-base">{{ letter }}</p>
    </div>
    `
})
export class CommentPhotoComponent implements OnInit {

    @Input() author!: string;
    letter!: string;
    color!: string;

    ngOnInit() {
        this.letter = this.author.slice(0, 1).toLocaleLowerCase();
        this.color = this.getBackgroundColor(this.letter);
    }

    getBackgroundColor(letter: string) {
        switch (true) {
            case letter <= 'e':
              return 'bg-indigo-500';
            case letter >= 'f' && letter <= 'j':
              return 'bg-orange-500';
            case letter >= 'k' && letter <= 'o':
              return 'bg-emerald-500';
            case letter >= 'p' && letter <= 't':
              return 'bg-pink-500';
            default:
              return 'bg-lime-500';
          }
    }
}