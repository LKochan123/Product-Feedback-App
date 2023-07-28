import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';
import { Observable, Subject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environemnt } from 'src/environments/environment';
import { FeedbackFormComponent } from '../features/feedback-form/feedback-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { FeedbacksResponse } from 'src/app/shared/models/interfaces/feedbacks-response';
import { FeedbackForm } from 'src/app/shared/models/types/feedback-form.type';
import { StatusEnum } from 'src/app/shared/models/enums/status';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  feedbacks$ = new Subject<Feedback[]>();
  private url = environemnt.apiUrl + 'feedbacks/';
  private dialogRef: MatDialogRef<FeedbackFormComponent> | undefined;
  private POPUP_DELAY_TIME = 800;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  getFeedbacksUpdate$(): Observable<Feedback[]> {
    return this.feedbacks$.asObservable();
  }

  getFeedbacks() {
    return this.http.get<FeedbacksResponse>(this.url);
  }

  getFeedbacksByStatus$(status: StatusEnum) {
    const queryParams = `?status=${status}`;
    return this.http.get<FeedbacksResponse>(this.url + 'status' + queryParams);
  }

  getFeedbackById$(id: string) {
    return this.http.get<{ message: string; feedback: Feedback }>(this.url + id);
  }

  addFeedback(feedbackForm: FormGroup<FeedbackForm>) {
    const { title, category, detail } = feedbackForm.value;
    const feedback = {
      title: title?.trim(),
      category: category,
      upvotes: 0,
      status: StatusEnum.SUGGESTION,
      description: detail?.trim(),
    };

    this.http
      .post<{ message: string }>(this.url, feedback)
      .pipe(
        tap(() => {
          this.closeDialog();
          this.router.url === '/' ? window.location.reload() : this.router.navigate(['/']);
          setTimeout(() => this.openPopup('Feedback added!'), this.POPUP_DELAY_TIME);
        })
      )
      .subscribe();
  }

  deleteFeedback$(id: string) {
    return this.http.delete<{ message: string }>(this.url + id);
  }

  updateFeedback(id: string, feedbackForm: FormGroup<FeedbackForm>) {
    const { title, category, status, detail } = feedbackForm.value;
    const feedback = {
      title: title?.trim(),
      category: category,
      status: status,
      description: detail?.trim(),
    };

    this.http
      .patch<{ message: string }>(this.url + id, feedback)
      .pipe(
        tap(() => {
          this.closeDialog();
          this.navigateByStatus(status!);
          setTimeout(() => this.openPopup('Feedback updated!'), this.POPUP_DELAY_TIME);
        })
      )
      .subscribe();
  }

  upvotesOnFeedback(id: string) {
    this.http.patch<{ message: string }>(this.url + 'upvotes/' + id, null).subscribe();
  }

  openDialog(id: string | null) {
    this.dialogRef = this.dialog.open(FeedbackFormComponent, {
      minWidth: '300px',
      data: { id },
    });
  }

  openPopup(text: string) {
    const popupRef = this.dialog.open(PopupComponent, {
      data: { text },
      position: { top: '1%' },
      backdropClass: 'no-backdrop',
      autoFocus: false,
    });
    setTimeout(() => popupRef.close(), 1500);
  }

  private closeDialog() {
    this.dialogRef?.close();
  }

  private navigateByStatus(status: StatusEnum) {
    this.router.navigate(status === StatusEnum.SUGGESTION ? ['/'] : ['/roadmap']);
  }
}
