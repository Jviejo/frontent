import { Pipe, PipeTransform } from '@angular/core';
import {LOCALE_ID } from '@angular/core';
@Pipe({
  name: 'importe'
})
export class ImportePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value < 0) {
      return value;

    } else {
      return `${LOCALE_ID }${value}`;
    }
  }

}
