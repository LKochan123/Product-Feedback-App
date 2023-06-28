import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { tap } from 'rxjs/operators';
import { CategoryTagEnum } from 'src/app/models/enums/category-tag';

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html',
    styles: [
      `.error {
        border: 0.5px solid tomato;
      }

      .select-arrow {
        border-right: 12px solid transparent;
      }`
    ]
})
export class FeedbackFormComponent implements OnInit {

    categoryOptions = CategoryTagEnum;
    statusOptions = ['Suggestion', 'Planned', 'In-Progress', 'Live']
    @Input() fMode!: { isEditingPost: boolean, id: string | null };
    feedbackForm!: FormGroup;
    headingName!: string;
    isLoading!: boolean;
    isSubmitted = false;
    errorTitleText = '';
    errorDetailText = '';
  
    constructor(private productsServcie: ProductsService, private router: Router) { }
  
    ngOnInit() {
      this.createFeedbackForm();
      
      if (this.fMode.id) {
        this.isLoading = true;
        this.productsServcie.getPostById$(this.fMode.id).subscribe(res => {
          const { title, category, status, description } = res.feedback;
          this.headingName = `Editing "${title}"`;
          this.feedbackForm.setValue({
            'title': title,
            'category': category,
            'status': status,
            'detail': description
          });
          this.isLoading = false;
        })
      }
    }
  
    createFeedbackForm() {
      this.feedbackForm = new FormGroup({
        'title': new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(30), Validators.pattern(/\S/)]
        }),
        'category': new FormControl('FEATURE', { 
          validators: [Validators.required] 
        }),
        'status': new FormControl('Suggestion'),
        'detail': new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(200), Validators.pattern(/\S/)]
        })
      })
    }
  
    onSubmit() {
      const { title, category, status, detail } = this.feedbackForm.value;
      const enumCategory = CategoryTagEnum[category as keyof typeof CategoryTagEnum];

      if (this.feedbackForm.valid) {
        if (this.fMode.id) {
          this.productsServcie.updatePost(this.fMode.id, title?.trim(), enumCategory, status, detail?.trim());
        } else {
          this.productsServcie.addPost(title, enumCategory, detail);
        }
      } else {
        this.errorTitleText = this.getErrorMessage('title');
        this.errorDetailText = this.getErrorMessage('detail');
      }
      this.isSubmitted = true;
    }

    getErrorMessage(controlName: string) { 
      const control = this.feedbackForm.get(controlName);
      if (control) {
        const maxLength = `${control.errors?.['maxlength']?.requiredLength}`;
        const capitalizedControlName = controlName.substring(0, 1).toUpperCase() + controlName.substring(1);
        switch (true) {
          case control.hasError('required'):
            return `${capitalizedControlName} is required.`;
          case control.hasError('maxlength'):
            return `${capitalizedControlName} should not exceed ${maxLength} characters.`;
          case control.hasError('pattern'):
            return `${capitalizedControlName} should contain at least one non-space character.`;
          default:
            return 'Undifined error';
        }
      }
      return '';
    }

    onDelete(id: string | null) {
      if (id) {
        this.productsServcie.deletePost$(id).pipe(
          tap(() => {
            const { status } = this.feedbackForm.value;
            this.router.navigate(status === 'Suggestion' ? ['/'] : ['/roadmap']);
          })
        ).subscribe();
      }
    }
}