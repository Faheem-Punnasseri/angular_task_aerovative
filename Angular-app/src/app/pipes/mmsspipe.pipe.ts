import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mmsspipe'
})
export class MmsspipePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    if (value.length !== 4) {
      return value;
    }
    const minutes = value.substr(0, 2);
    const seconds = value.substr(2, 2);
    return `${minutes}:${seconds}`;
  }

}
