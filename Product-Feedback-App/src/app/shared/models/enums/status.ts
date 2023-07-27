export enum StatusEnum {
  SUGGESTION = 'Suggestion',
  PLANNED = 'Planned',
  IN_PROGRESS = 'In-Progress',
  LIVE = 'Live',
}

export interface StatusSelectOption<T> {
  label: string;
  value: T;
}
