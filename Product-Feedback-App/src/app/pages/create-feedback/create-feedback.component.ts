import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-feedback-post',
    templateUrl: './create-feedback.component.html'
  })
export class CreateFeedbackComponent implements OnInit {

  feedbackForm!: FormGroup;
  isCreatingFeedback = true;

  ngOnInit() {
    this.feedbackForm = new FormGroup({
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(30)]
      }),
      'category': new FormControl(),
      'detail': new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(100)]
      })
    })
  }
}