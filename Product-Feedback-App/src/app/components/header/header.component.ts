import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  optionArr = [ 
    'Most upvotes', 'Least upvotes', 'Most comments', 'Least comments'
  ];

  @Input() actualPage!: string;
  @Input() countSuggestions!: number;
}