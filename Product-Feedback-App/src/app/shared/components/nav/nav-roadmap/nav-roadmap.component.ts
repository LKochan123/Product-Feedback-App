import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, forkJoin, map, Subscription, of, startWith } from 'rxjs';
import { FeedbackService } from 'src/app/feedbacks/services/feedback.service';
import { StatusEnum } from 'src/app/shared/models/enums/status';

@Component({
  selector: 'app-nav-roadmap',
  templateUrl: './nav-roadmap.component.html',
})
export class NavRoadmapComponent implements OnInit, OnDestroy {
  //propozycja jak mozna uproscic
  //nie trzeba sie subskrybowac, odsubskrybowywac, nie trzeba trzymac stanu ladowania
  countPlanned$ = this.countStatusOccurance$(StatusEnum.PLANNED).pipe(startWith('...'));

  countPlanned!: number | string;
  countInProgress!: number | string;
  countLive!: number | string;
  forkSub!: Subscription;
  isLoading = true;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit() {
    //subscribe!
    this.forkSub = forkJoin([
      this.countStatusOccurance$(StatusEnum.PLANNED),
      this.countStatusOccurance$(StatusEnum.IN_PROGRESS),
      this.countStatusOccurance$(StatusEnum.LIVE),
    ]).subscribe(([plannedCounter, progressCounter, liveCounter]) => {
      this.countPlanned = plannedCounter;
      this.countInProgress = progressCounter;
      this.countLive = liveCounter;
      this.isLoading = false;
    });
  }

  private countStatusOccurance$(status: StatusEnum) {
    return this.feedbackService.getFeedbacksByStatus$(status).pipe(
      map(response => response.occurance),
      //To jest skandal :D
      //Jesli juz zamierzasz obslugiwac bledy (a wszedzie gdzie laczysz sie z backiem powinienes to robic!!!), to a) zrob cos z nimi, np, wyswietl jakies info w toascie
      //b) catchError powinien zwrocic EMPTY, zeby zamknac observabla
      catchError(() => of('x'))
    );
  }

  ngOnDestroy() {
    this.forkSub.unsubscribe();
  }
}
