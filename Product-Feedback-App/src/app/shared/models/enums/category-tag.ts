export enum CategoryTagEnum {
  ALL = 'All',
  UI = 'UI',
  UX = 'UX',
  ENHANCEMENT = 'Enhancement',
  BUG = 'Bug',
  FEATURE = 'Feature',
}

export interface CategorySelectOption<T> {
  label: string;
  value: T;
}
