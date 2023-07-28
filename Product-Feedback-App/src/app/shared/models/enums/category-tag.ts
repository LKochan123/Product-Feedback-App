export enum CategoryTagEnum {
  ALL = 'All',
  UI = 'UI',
  UX = 'UX',
  ENHANCEMENT = 'Enhancement',
  BUG = 'Bug',
  FEATURE = 'Feature',
}

//Trzymajmy sie zasady: jeden plik - jeden zasob.
//Wyniesmy ten interfejs do osobnego pliku.
export interface CategorySelectOption<T> {
  label: string;
  value: T;
}
