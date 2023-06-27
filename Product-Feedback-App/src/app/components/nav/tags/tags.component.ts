import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { CategoryTagService } from 'src/app/services/category-tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styles: [
  `a {
    transition:  background-color .3s, color .3s;
  }

  a:hover {
      background-color: #818fd8;
      color: rgb(255, 255, 255);
  }

  .tag-background {
      background-color: #4761E6;
      color: white;
  }`
  ]
})
export class TagsComponent implements OnInit {

  currentTag$!: Observable<string>;
  tagsArr = ['ALL', 'UI', 'UX', 'Enhancment', 'Bug', 'Feature'];

  constructor(
    private categoryTagService: CategoryTagService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.currentTag$ = this.categoryTagService.getCurrentTag$();
    const actualCategory = this.route.snapshot.queryParamMap.get('category');
    if (actualCategory) { 
      this.categoryTagService.setCurrentTag(actualCategory);
    }
  }

  onFilterCategory(category: string) {
    this.categoryTagService.setCurrentTag(category);
    this.router.navigate([''], { 
      queryParams: (category === 'ALL') ? null : { category: category }
    })
  };
}