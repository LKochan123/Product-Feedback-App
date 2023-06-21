import { Component, Input, OnInit } from '@angular/core';
import { SuggestionsCountService } from 'src/app/services/suggestions-count.service';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() actualPage!: string;
  username!: string | null;
  isAuthenticated = false;
  showDropdown = false;
  countSuggestions$!: Observable<number|string>;
  optionArr = [ 
    'Most upvotes', 'Least upvotes', 'Most comments', 'Least comments'
  ];

  constructor(private suggestionCountService: SuggestionsCountService, 
    private authService: AuthService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.suggestionCountService.setCountDisplayedSuggestions();
    this.countSuggestions$ = this.suggestionCountService.getCountDisplayedSuggestions$().pipe(
      startWith('..')
    );
  }

  onLogout() {
    this.authService.logOut();
  }

  onShowDropdown() {
    this.showDropdown = !this.showDropdown;
  }

}