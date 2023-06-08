import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
    selector: 'app-feedback-post',
    templateUrl: './create-feedback.component.html'
  })
export class CreateFeedbackComponent implements OnInit {

  formMode!: { 
    isEditingPost: boolean, 
    id: string | null 
  };

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.formMode = { isEditingPost: true, id: paramMap.get('id') };
      } else {
        this.formMode = { isEditingPost: false, id: null };
      }
    })
  }
}