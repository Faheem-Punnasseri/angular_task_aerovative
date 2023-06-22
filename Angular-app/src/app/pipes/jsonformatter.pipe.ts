import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonformatter'
})
export class JsonformatterPipe implements PipeTransform {

  transform(value: any): string {
    try {
      return JSON.stringify(value, null, 2);
    } catch (error) {
      console.error('Invalid JSON format');
      return '';
    }
  }

}
