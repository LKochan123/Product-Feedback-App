import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, lastIndex: number, suffix: string) {
    const n = text.length;
    return lastIndex > n ? text : text.slice(0, lastIndex) + suffix;
  }
}
