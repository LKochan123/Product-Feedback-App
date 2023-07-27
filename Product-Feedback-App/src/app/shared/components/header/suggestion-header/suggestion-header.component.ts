import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CategoryTagService } from 'src/app/feedbacks/services/category-tag.service';
import { SuggestionsService } from 'src/app/feedbacks/services/suggestions.service';
import { SortingFeedbackEnum } from 'src/app/shared/models/enums/sorting-feedback';

@Component({
  selector: 'app-suggestion-header',
  templateUrl: './suggestion-header.component.html',
})
export class SuggestionHeaderComponent implements OnInit {
  suggestionsCount$!: Observable<number | string>;
  sortingFeedbackEnum = SortingFeedbackEnum;
  isUserAuthenticated = this.authService.isAuthenticated;

  constructor(
    private authService: AuthService,
    private suggestionService: SuggestionsService,
    private categoryTagService: CategoryTagService
  ) {}

  ngOnInit() {
    this.suggestionService.setDisplayedSuggestionCount$();
    this.suggestionsCount$ = this.suggestionService.getDisplayedSuggestionCount$();
  }

  onSortingMethod(actualMethod: string) {
    const enumMenthod = this.sortingFeedbackEnum[actualMethod as keyof typeof SortingFeedbackEnum];
    this.categoryTagService.setCurrentSortingType(enumMenthod);
  }
}
