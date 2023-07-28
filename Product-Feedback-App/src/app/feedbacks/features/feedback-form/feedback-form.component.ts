import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { tap } from 'rxjs/operators';
import { CategoryTagEnum } from 'src/app/shared/models/enums/category-tag';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusEnum } from 'src/app/shared/models/enums/status';
import { Feedback } from 'src/app/shared/models/interfaces/feedback.model';
import { SelectOption } from 'src/app/shared/models/interfaces/select-option';
import { statusOptions, categoryOptions } from 'src/app/shared/selects/select-options';
import { FeedbackForm } from 'src/app/shared/models/types/feedback-form.type';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup<FeedbackForm> = this.createFeedbackForm();
  statusOptions: SelectOption<StatusEnum>[] = statusOptions;
  categoryOptions: SelectOption<CategoryTagEnum>[] = categoryOptions;
  headingName!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      id: string | null;
    },
    private feedbackServcie: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.data.id) {
      this.feedbackServcie
        .getFeedbackById$(this.data.id)
        .pipe(
          tap(res => {
            this.headingName = `Editing "${res.feedback.title}"`;
            this.setFeedbackFormValues(res.feedback);
          })
        )
        .subscribe();
    }
  }

  onSubmit() {
    if (this.feedbackForm.valid) {
      if (this.data.id) {
        this.feedbackServcie.updateFeedback(this.data.id, this.feedbackForm);
      } else {
        this.feedbackServcie.addFeedback(this.feedbackForm);
      }
    }
  }

  onDelete(id: string | null) {
    if (id) {
      this.feedbackServcie
        .deleteFeedback$(id)
        .pipe(
          tap(() => {
            const { status } = this.feedbackForm.value;
            this.router.navigate(status === StatusEnum.SUGGESTION ? ['/'] : ['/roadmap']);
            this.feedbackServcie.openPopup('Feedback deleted!');
          })
        )
        .subscribe();
    }
  }

  private setFeedbackFormValues(feedback: Feedback) {
    const { title, category, status, description } = feedback;
    this.feedbackForm.setValue({
      title: title,
      category: category,
      status: status,
      detail: description,
    });
  }

  private createFeedbackForm() {
    return new FormGroup<FeedbackForm>({
      title: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(30), Validators.pattern(/\S/)],
        nonNullable: true,
      }),
      category: new FormControl(CategoryTagEnum.FEATURE, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      status: new FormControl(StatusEnum.SUGGESTION, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      detail: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(200), Validators.pattern(/\S/)],
        nonNullable: true,
      }),
    });
  }
}
