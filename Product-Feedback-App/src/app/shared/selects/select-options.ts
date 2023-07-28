import { SelectOption } from '../models/interfaces/select-option.model';
import { StatusEnum } from '../models/enums/status';
import { CategoryTagEnum } from '../models/enums/category-tag';

export const statusOptions: SelectOption<StatusEnum>[] = [
  { label: 'Suggestion', value: StatusEnum.SUGGESTION },
  { label: 'Planned', value: StatusEnum.PLANNED },
  { label: 'In-Progress', value: StatusEnum.IN_PROGRESS },
  { label: 'Live', value: StatusEnum.LIVE },
];

export const categoryOptions: SelectOption<CategoryTagEnum>[] = [
  { label: 'Bug', value: CategoryTagEnum.BUG },
  { label: 'Enhancment', value: CategoryTagEnum.ENHANCEMENT },
  { label: 'Feature', value: CategoryTagEnum.FEATURE },
  { label: 'UI', value: CategoryTagEnum.UI },
  { label: 'UX', value: CategoryTagEnum.UX },
];
