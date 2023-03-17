import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateProjectDescr'
})
export class TruncateProjectDescrPipe implements PipeTransform {

  SIZE = 30;
  transform(value: string): string {
    if (value.length > this.SIZE) {
      return value.substring(0, this.SIZE) + '...';
    }
    return value;
  }
}
