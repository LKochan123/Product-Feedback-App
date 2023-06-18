import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SuggestionsCountService } from 'src/app/services/suggestions-count.service';
import { Observable, Subscription, forkJoin } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() actualPage!: string;
  isAuthenticatedSub!: Subscription;
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
    this.isAuthenticatedSub = this.authService.getIsAuthenticated$().subscribe(isLogin => {
      this.isAuthenticated = isLogin;
    })
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

  ngOnDestroy() {
    this.isAuthenticatedSub.unsubscribe();
  }

}