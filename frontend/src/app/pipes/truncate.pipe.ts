import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(text: string  ): string  {
    const firstPeriodIndex = text.indexOf('.');
    if (firstPeriodIndex !== -1) {
      return text.slice(0, firstPeriodIndex + 1);
    }
    return text;
  }
}
