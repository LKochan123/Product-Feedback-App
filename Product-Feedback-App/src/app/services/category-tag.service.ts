import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortingFeedbackEnum } from '../models/enums/sorting-feedback';
import { CategoryTagEnum } from '../models/enums/category-tag';

@Injectable({
  providedIn: 'root',
})
export class CategoryTagService {
  private currentTag$ = new BehaviorSubject<CategoryTagEnum>(CategoryTagEnum.ALL);
  private currentSortingMethod$ = new BehaviorSubject<SortingFeedbackEnum>(SortingFeedbackEnum.DEFAULT); //Nie do końca kminie, czemu sortowanie jest w serwisie razem z tagami. To jest przeciez inna funkcjonalność.

  getCurrentTag$(): Observable<CategoryTagEnum> {
    return this.currentTag$.asObservable();
  }

  setCurrentTag(category: CategoryTagEnum) {
    this.currentTag$.next(category);
  }

  getCurrentSortingMethod$(): Observable<SortingFeedbackEnum> {
    return this.currentSortingMethod$.asObservable();
  }

  setCurrentSortingMethod(method: SortingFeedbackEnum) {
    //Uzycie tutaj slowa method jest mylace - to sugeruje, ze powinna byc argumencie przekazana funkcja. Ja bym zmienil na sortingType.
    this.currentSortingMethod$.next(method);
  }
}
