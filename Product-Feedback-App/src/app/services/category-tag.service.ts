import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SortingFeedbackEnum } from '../models/enums/sorting-feedback';
import { CategoryTagEnum } from '../models/enums/category-tag';

@Injectable({
  providedIn: 'root',
})
export class CategoryTagService {
  private currentTag$ = new BehaviorSubject<CategoryTagEnum>(CategoryTagEnum.ALL);
  private currentSortingMethod$ = new BehaviorSubject<SortingFeedbackEnum>(
    SortingFeedbackEnum.DEFAULT
  );

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
    this.currentSortingMethod$.next(method);
  }
}
