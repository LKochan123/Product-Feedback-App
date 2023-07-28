import { FormControl } from '@angular/forms';
import { CategoryTagEnum } from 'src/app/shared/models/enums/category-tag';
import { StatusEnum } from 'src/app/shared/models/enums/status';

export type FeedbackForm = {
  title: FormControl<string>;
  category: FormControl<CategoryTagEnum>;
  status: FormControl<StatusEnum>;
  detail: FormControl<string>;
};
