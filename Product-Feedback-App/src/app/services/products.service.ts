import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/interfaces/post.model';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryTagEnum } from '../models/enums/category-tag';
import { environemnt } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FeedbackFormComponent } from '../components/feedback-form/feedback-form.component';
import { PopupComponent } from '../components/popup/popup-informaiton.component';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  feedbacks$ = new Subject<Post[]>();
  private url = environemnt.apiUrl + 'feedbacks/';
  private dialogRef: MatDialogRef<FeedbackFormComponent> | undefined;
  private POPUP_DELAY_TIME = 800;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog
  ) {}

  getPostsUpdate$(): Observable<Post[]> {
    return this.feedbacks$.asObservable();
  }

  getPosts() {
    return this.http.get<{
      message: string;
      feedbacks: Post[];
      occurance: number;
    }>(this.url);
  }

  getPostsByStatus$(status: string) {
    const queryParams = `?status=${status}`;
    return this.http.get<{
      message: string;
      feedbacks: Post[];
      occurance: number;
    }>(this.url + 'status' + queryParams);
  }

  getPostById$(id: string) {
    return this.http.get<{ message: string; feedback: Post }>(this.url + id);
  }

  addPost(title: string, category: CategoryTagEnum, description: string) {
    const feedback = {
      title: title,
      category: category,
      upvotes: 0,
      status: 'Suggestion',
      description: description,
    };

    this.http.post<{ message: string }>(this.url, feedback).subscribe(() => {
      this.closeDialog();
      this.router.navigate(['/']);
      setTimeout(() => this.openPopup('Feedback added!'), this.POPUP_DELAY_TIME);
    });
  }

  deletePost$(id: string) {
    return this.http.delete<{ message: string }>(this.url + id);
  }

  updatePost(
    id: string,
    title: string,
    category: CategoryTagEnum,
    status: string,
    description: string
  ) {
    const feedback = { title, category, status, description };
    this.http.patch<{ message: string }>(this.url + id, feedback).subscribe(() => {
      this.closeDialog();
      this.navigateByStatus(status);
      setTimeout(() => this.openPopup('Feedback updated!'), this.POPUP_DELAY_TIME);
    });
  }

  upvotesOnPost(id: string) {
    this.http.patch<{ message: string }>(this.url + 'upvotes/' + id, null).subscribe();
  }

  openDialog(isEditingPost: boolean, id: string | null) {
    this.dialogRef = this.dialog.open(FeedbackFormComponent, {
      minWidth: '300px',
      data: { isEditingPost, id },
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

  private navigateByStatus(status: string) {
    this.router.navigate(status === 'Suggestion' ? ['/'] : ['/roadmap']);
  }
}
