import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { CategoryTagService } from 'src/app/services/category-tag.service';

@Component({
    selector: 'app-feedback-information',
    templateUrl: './feedback-information.component.html'
})
export class FeedbackInformationComponent implements OnInit {

  @Input() feedbackArr: Post[] = [];
  category$!: Observable<string>;

  constructor(private categoryTagService: CategoryTagService) { }

  ngOnInit() {
    this.category$ = this.categoryTagService.getCurrentTag$();
  }
}