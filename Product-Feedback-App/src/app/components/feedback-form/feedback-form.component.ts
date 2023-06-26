import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html',
    styles: [
      `.select-arrow {
        border-right: 12px solid transparent;
      }`
    ]
})
export class FeedbackFormComponent implements OnInit {

    @Input() fMode!: { isEditingPost: boolean, id: string | null };
    feedbackForm!: FormGroup;
    headingName!: string;
    categoryOptions = ['UI', 'UX', 'Enhancment', 'Feature', 'Bug'];
    statusOptions = ['Suggestion', 'Planned', 'In-Progress', 'Live']
  
    constructor(private productsServcie: ProductsService, private router: Router) { }
  
    ngOnInit() {
      this.createFeedbackForm();
      
      if (this.fMode.id) {
        this.productsServcie.getPostById$(this.fMode.id).subscribe(res => {
          this.headingName = `Editing "${res.feedback.title}"`;
          this.feedbackForm.setValue({
            'title': res.feedback.title,
            'category': res.feedback.category,
            'status': res.feedback.status,
            'detail': res.feedback.description
          });
        })
      }
    }
  
    createFeedbackForm() {
      this.feedbackForm = new FormGroup({
        'title': new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(30)]
        }),
        'category': new FormControl('Feature', { 
          validators: [Validators.required] 
        }),
        'status': new FormControl('Suggestion'),
        'detail': new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(200)]
        })
      })
    }
  
    onSubmit() {
      const { title, category, status, detail } = this.feedbackForm.value;

      if (this.feedbackForm.valid) {
        if (this.fMode.id) {
          this.productsServcie.updatePost(this.fMode.id, title, category, status, detail);
        } else {
          this.productsServcie.addPost(title, category, detail);
        }
      } else {
        console.log('Form invalid!');
      }
    }

    onDelete(id: string | null) {
      if (id) {
        this.productsServcie.deletePost$(id).pipe(
          tap(() => {
            if (this.feedbackForm.value.status === 'Suggestion') {
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/roadmap']);
            }
          })
        ).subscribe();
      }
    }
}