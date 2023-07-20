import { Injectable, OnDestroy } from '@angular/core';
import { Subject, Observable, combineLatest, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ProductsService } from './products.service';
import { CategoryTagService } from './category-tag.service';
import { Post } from '../models/post.model';
import { CategoryTagEnum } from '../models/enums/category-tag';

@Injectable({
  providedIn: 'root',
})
export class SuggestionsCountService implements OnDestroy {
  private countDisplayedSuggestions$ = new Subject<number>(); // Nalezaloby zmienic nazwę. Czasownik na począ†ku sugeruje, ze to metoda. Proponowałbym displayedSuggestionsCount$$. Tez dodam, ze pracowalem w projektach gdzie "$$" bylo uzywane, zeby odroznic observable od subjectu, wiec mozesz skorzystac z takiej konwencji.
  private sub!: Subscription;

  constructor(private productService: ProductsService, private categoryTagService: CategoryTagService) {}

  getCountDisplayedSuggestions$(): Observable<number> {
    return this.countDisplayedSuggestions$.asObservable();
  }

  // Zrefaktorowałem ten kod. W dokumencie w sekcji RXJS punkt 1 wytłumaczenie.
  setCountDisplayedSuggestions() {
    this.sub.add(
      combineLatest([
        this.productService.getPostsByStatus$('Suggestion').pipe(map((response) => response.feedbacks)),
        this.categoryTagService.getCurrentTag$(),
      ])
        .pipe(
          tap(([suggestions, category]) =>
            this.countDisplayedSuggestions$.next(this.countLikeCategoryPipe(suggestions, category))
          )
        )
        .subscribe()
    );
  }

  //To nie jest pipe. Bardzo ciezko sie zorientowac po nazwie, o co biega. Proponowalbym getFeedbacksCountInGivenCategory(). Do tego to jest ewidentnie prywatna metoda!
  countLikeCategoryPipe(feedbacks: Post[], category: CategoryTagEnum): number {
    if (category === CategoryTagEnum.ALL) {
      return feedbacks.length;
      // Nie potrzebujesz tego elsa tutaj. Raczej unikamy zagniezdzania. Całe ciało funkcji zrefaktorowane ciut nizej.
    } else {
      return feedbacks.filter((feedback) => feedback.category === category).length;
    }

    // imo tak jest czytelniej. https://refactoring.guru/replace-nested-conditional-with-guard-clauses
    // if (category === CategoryTagEnum.ALL) return feedbacks.length;
    // return feedbacks.filter((feedback) => feedback.category === category).length;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
