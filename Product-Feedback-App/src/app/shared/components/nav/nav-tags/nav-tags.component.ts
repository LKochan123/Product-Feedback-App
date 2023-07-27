import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryTagEnum } from 'src/app/shared/models/enums/category-tag';
import { CategoryTagService } from 'src/app/feedbacks/services/category-tag.service';

@Component({
  selector: 'app-nav-tags',
  templateUrl: './nav-tags.component.html',
  styleUrls: ['./nav-tags.component.css'],
})
export class NavTagsComponent implements OnInit {
  currentTag$!: Observable<CategoryTagEnum>;
  categoryTags = CategoryTagEnum;

  constructor(
    private categoryTagService: CategoryTagService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentTag$ = this.categoryTagService.getCurrentTag$();
    const actualCategory = this.route.snapshot.queryParamMap.get('category');

    if (actualCategory) {
      const enumTagKey = actualCategory.toUpperCase();
      const enumActualCategory = this.categoryTags[enumTagKey as keyof typeof CategoryTagEnum];
      this.categoryTagService.setCurrentTag(enumActualCategory);
    }
  }

  onFilterCategory(category: string) {
    const enumCategoryTag = this.categoryTags[category as keyof typeof CategoryTagEnum];
    this.categoryTagService.setCurrentTag(enumCategoryTag);
    this.router.navigate([''], {
      queryParams: category === 'ALL' ? null : { category: enumCategoryTag.toLowerCase() },
    });
  }
}
