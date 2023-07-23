import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortingFeedbackEnum } from '../models/enums/sorting-feedback';
import { CategoryTagEnum } from '../models/enums/category-tag';

@Injectable({
  providedIn: 'root',
})
export class CategoryTagService {
  private currentTag$ = new BehaviorSubject<CategoryTagEnum>(CategoryTagEnum.ALL);
  private currentSortingType$ = new BehaviorSubject<SortingFeedbackEnum>(
    SortingFeedbackEnum.DEFAULT
  );

  getCurrentTag$(): Observable<CategoryTagEnum> {
    return this.currentTag$.asObservable();
  }

  setCurrentTag(category: CategoryTagEnum) {
    this.currentTag$.next(category);
  }

  getCurrentSortingType$(): Observable<SortingFeedbackEnum> {
    return this.currentSortingType$.asObservable();
  }

  setCurrentSortingType(method: SortingFeedbackEnum) {
    this.currentSortingType$.next(method);
  }
}
