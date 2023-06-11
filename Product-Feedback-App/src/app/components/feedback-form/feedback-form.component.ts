import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-feedback-form',
    templateUrl: './feedback-form.component.html'
})
export class FeedbackFormComponent implements OnInit {

    @Input() fMode!: { isEditingPost: boolean, id: string | null };
    feedbackForm!: FormGroup;
    headingName!: string;
    categoryOptions = ['UI', 'UX', 'Enhancment', 'Feature', 'Bug'];
    statusOptions = ['Suggestion', 'Planned', 'In progress', 'Live']
  
    constructor(private productsServcie: ProductsService, 
      private router: Router) { }
  
    ngOnInit() {
      this.createFeedbackForm();
      
      if (this.fMode.id) {
        this.productsServcie.getPostById(this.fMode.id).subscribe(res => {
          this.headingName = `Editing "${res.feedback.title}"`;
          this.feedbackForm.setValue({
            'title': res.feedback.title,
            'category': res.feedback.category,
            'status': 'Suggestion',
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
        'status': new FormControl(),
        'detail': new FormControl(null, {
          validators: [Validators.required, Validators.maxLength(200)]
        })
      })
    }
  
    onSubmit() {
      const title = this.feedbackForm.value.title;
      const category = this.feedbackForm.value.category;
      const detail = this.feedbackForm.value.detail;
      const status = this.feedbackForm.value.status;

      if (this.feedbackForm.valid) {
        if (this.fMode.id) {
          this.productsServcie.updatePost(this.fMode.id, title, category, status, detail);
        } else {
          this.productsServcie.addPost(title, category, detail);
        }
      } else {
        console.log('Form invalid!');
      }
      
      this.feedbackForm.reset();
      this.router.navigate(['/']);
    }

    onDelete(id: string | null) {
      if (id) {
        this.productsServcie.deletePost(id);
        this.router.navigate(['/']);
      }
    }
}