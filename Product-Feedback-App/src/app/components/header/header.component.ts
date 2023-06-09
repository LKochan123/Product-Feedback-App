import { Component, Input, OnInit } from '@angular/core';
import { SuggestionsCountService } from 'src/app/services/suggestions-count.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { SortingFeedbackEnum } from 'src/app/models/enums/sorting-feedback';
import { CategoryTagService } from 'src/app/services/category-tag.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  @Input() actualPage!: string;
  username!: string | null;
  countSuggestions$!: Observable<number|string>;
  sortingFeedbackEnum = SortingFeedbackEnum;
  isLoading = true;
  isAuthenticated = false;
  showDropdown = false;
  connectionError = false;

  constructor(
    private suggestionCountService: SuggestionsCountService, 
    private authService: AuthService,
    private cateogryTagService: CategoryTagService) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.suggestionCountService.setCountDisplayedSuggestions();
    this.countSuggestions$ = this.suggestionCountService.getCountDisplayedSuggestions$().pipe(
      startWith('..'),
      catchError(() => this.handleError())
    );
  }

  onLogout() {
    this.authService.logOut();
  }

  onShowDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  onSortingMethod(actualMethod: string) {
    const enumMenthod = this.sortingFeedbackEnum[actualMethod as keyof typeof SortingFeedbackEnum];
    this.cateogryTagService.setCurrentSortingMethod(enumMenthod);
  }

  handleError() {
    this.connectionError = true;
    this.isLoading = false
    return throwError(() => "Error with counting status!")
  }

}