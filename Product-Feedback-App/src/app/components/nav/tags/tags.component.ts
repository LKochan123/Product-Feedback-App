import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryTagService } from 'src/app/services/category-tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  currentTag$!: Observable<string>;
  tagsArr = ['ALL', 'UI', 'UX', 'Enhancment', 'Bug', 'Feature'];

  constructor(private categoryTagService: CategoryTagService ) { }

  ngOnInit() {
    this.currentTag$ = this.categoryTagService.getCurrentTag$();
  }

  onFilterCategory(category: string) {
    this.categoryTagService.setCurrentTag(category);
  }
}