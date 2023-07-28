import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CategoryTagService } from 'src/app/feedbacks/services/category-tag.service';
import { SuggestionsService } from 'src/app/feedbacks/services/suggestions.service';
import { SortingFeedbackEnum } from 'src/app/shared/models/enums/sorting-feedback';
import { SelectOption } from 'src/app/shared/models/interfaces/select-option';
import { sortingOptions } from 'src/app/shared/selects/select-options';

@Component({
  selector: 'app-suggestion-header',
  templateUrl: './suggestion-header.component.html',
})
export class SuggestionHeaderComponent implements OnInit {
  suggestionsCount$!: Observable<number | string>;
  sortingOptions: SelectOption<SortingFeedbackEnum>[] = sortingOptions;
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

  onSortingMethod(currMethod: string) {
    this.categoryTagService.setCurrentSortingType(this.transformSortingMethodToEnum(currMethod));
  }

  private transformSortingMethodToEnum(currMethod: string) {
    const currMethodKey = currMethod.replace(/ /g, '_').toLocaleUpperCase();
    return SortingFeedbackEnum[currMethodKey as keyof typeof SortingFeedbackEnum];
  }
}
