import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  SIZE = 120;
  transform(value: string): string {
    if (value.length > this.SIZE) {
      return value.substring(0, this.SIZE) + '...';
    }
    return value;
  }
}
