import { SelectOption } from '../models/interfaces/select-option';
import { StatusEnum } from '../models/enums/status';
import { CategoryTagEnum } from '../models/enums/category-tag';
import { SortingFeedbackEnum } from '../models/enums/sorting-feedback';

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

export const sortingOptions: SelectOption<SortingFeedbackEnum>[] = [
  { label: 'Default', value: SortingFeedbackEnum.DEFAULT },
  { label: 'Most upvotes', value: SortingFeedbackEnum.MOST_UPVOTES },
  { label: 'Least upvotes', value: SortingFeedbackEnum.LEAST_UPVOTES },
  { label: 'Most comments', value: SortingFeedbackEnum.MOST_COMMENTS },
  { label: 'Least comments', value: SortingFeedbackEnum.LEAST_COMMENTS },
];
