import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SuggestionsCountService } from 'src/app/services/suggestions-count.service';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() actualPage!: string;
  countSuggestions$!: Observable<number|string>;
  optionArr = [ 
    'Most upvotes', 'Least upvotes', 'Most comments', 'Least comments'
  ];

  constructor(private suggestionCountService: SuggestionsCountService) { }

  ngOnInit() {
    this.suggestionCountService.setCountDisplayedSuggestions();
    this.countSuggestions$ = this.suggestionCountService.getCountDisplayedSuggestions$().pipe(
      startWith('..')
    );
  }

}