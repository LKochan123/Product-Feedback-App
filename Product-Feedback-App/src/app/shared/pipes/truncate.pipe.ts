import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, lastIndex: number, suffix: string) {
    return lastIndex > text.length ? text : text.slice(0, lastIndex) + suffix;
  }
}
