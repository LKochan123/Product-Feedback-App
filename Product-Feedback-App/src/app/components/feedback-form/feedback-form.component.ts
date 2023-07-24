import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { tap } from 'rxjs/operators';
import { CategoryTagEnum } from 'src/app/models/enums/category-tag';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DropdownMenuComponent } from '../buttons/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css'],
})
export class FeedbackFormComponent implements OnInit {
  statusOptions = ['Suggestion', 'Planned', 'In-Progress', 'Live'];
  categoryOptions = CategoryTagEnum;
  feedbackForm!: FormGroup;
  headingName!: string;
  isSubmitted = false;
  errorTitleText = '';
  errorDetailText = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      isEditingPost: boolean;
      id: string | null;
    },
    private productsServcie: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.createFeedbackForm();

    if (this.data.id) {
      this.productsServcie.getPostById$(this.data.id).subscribe(res => {
        const { title, category, status, description } = res.feedback;
        this.headingName = `Editing "${title}"`;
        this.feedbackForm.setValue({
          title: title,
          category: category.toUpperCase(),
          status: status,
          detail: description,
        });
      });
    }
  }

  onSubmit() {
    const { title, category, status, detail } = this.feedbackForm.value;
    const enumCategory = CategoryTagEnum[category as keyof typeof CategoryTagEnum];

    if (this.feedbackForm.valid) {
      if (this.data.id) {
        this.productsServcie.updatePost(
          this.data.id,
          title?.trim(),
          enumCategory,
          status,
          detail?.trim()
        );
      } else {
        this.productsServcie.addPost(title, enumCategory, detail);
      }
    } else {
      this.errorTitleText = this.getErrorMessage('title');
      this.errorDetailText = this.getErrorMessage('detail');
    }
    this.isSubmitted = true;
  }

  onDelete(id: string | null) {
    if (id) {
      this.productsServcie
        .deletePost$(id)
        .pipe(
          tap(() => {
            const { status } = this.feedbackForm.value;
            this.router.navigate(status === 'Suggestion' ? ['/'] : ['/roadmap']);
            this.productsServcie.openPopup('Feedback deleted!');
          })
        )
        .subscribe();
    }
  }

  private getErrorMessage(controlName: string) {
    const control = this.feedbackForm.get(controlName);
    if (control) {
      const maxLength = `${control.errors?.['maxlength']?.requiredLength}`;
      const capitalizedControlName =
        controlName.substring(0, 1).toUpperCase() + controlName.substring(1);
      switch (true) {
        case control.hasError('required'):
          return `${capitalizedControlName} is required.`;
        case control.hasError('maxlength'):
          return `${capitalizedControlName} should not exceed ${maxLength} characters.`;
        case control.hasError('pattern'):
          return `${capitalizedControlName} should contain at least one non-space character.`;
        default:
          return '';
      }
    }
    return '';
  }

  private createFeedbackForm() {
    this.feedbackForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30), Validators.pattern(/\S/)],
      }),
      category: new FormControl('FEATURE', {
        validators: [Validators.required],
      }),
      status: new FormControl('Suggestion'),
      detail: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(200), Validators.pattern(/\S/)],
      }),
    });
  }
}
