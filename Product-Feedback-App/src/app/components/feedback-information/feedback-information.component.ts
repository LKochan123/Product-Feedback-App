import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';

@Component({
    selector: 'app-feedback-information',
    templateUrl: './feedback-information.component.html',
    styleUrls: ['./feedback-information.component.css']
})
export class FeedbackInformationComponent implements OnInit {
  @Input() feedbackArr: Post[] = [];
  isOnRoadmapPage!: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isOnRoadmapPage = this.router.url === '/roadmap';
  }
}