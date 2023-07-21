import { Component, Input, OnInit } from '@angular/core';
import { SuggestionsCountService } from 'src/app/services/suggestions-count.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, startWith } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { SortingFeedbackEnum } from 'src/app/models/enums/sorting-feedback';
import { CategoryTagService } from 'src/app/services/category-tag.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Input() actualPage!: string; // Zmieniłbym na currentPage - lepiej opisuje, bo obecnie mamy rzeczywistąStronę. Do tego to powinien być enum, bo inaczej jest to mega podatne na literówki.
  username!: string | null; // to pole jest chyba nieuzywane nigdzie
  countSuggestions$!: Observable<number | string>; //Zmieniłbym na suggestionsCount - lepiej opisuje, a do tego juz tak nazwałeś serwis.
  sortingFeedbackEnum = SortingFeedbackEnum;
  isLoading = true;
  isAuthenticated = false; // Zmieniłbym na isUserAuthenticated - lepiej opisuje.
  showDropdown = false;
  connectionError = false; // Do czego jest nam to pole?

  constructor(
    private suggestionCountService: SuggestionsCountService,
    private authService: AuthService,
    private cateogryTagService: CategoryTagService // literówka
  ) {}

  ngOnInit() {
    this.isAuthenticated = this.authService.getIsAuthenticated();
    this.suggestionCountService.setCountDisplayedSuggestions();
    this.countSuggestions$ = this.suggestionCountService.getCountDisplayedSuggestions$().pipe(
      // Czy jest jakiś powód, dla którego ta logika jest tutaj, a nie bezpośrednio w serwisie?
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
    //Nazwa argumentu actualMethod sugeruje, ze przekazujemy w argumencie funkcję. Ja bym wszedzie to nazwal sortingType.
    const enumMenthod = this.sortingFeedbackEnum[actualMethod as keyof typeof SortingFeedbackEnum];
    this.cateogryTagService.setCurrentSortingMethod(enumMenthod);
  }

  handleError() {
    this.connectionError = true;
    this.isLoading = false;
    return throwError(() => 'Error with counting status!');
  }
}
