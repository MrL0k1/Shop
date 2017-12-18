import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zl'
})
export class ZlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value % 1 === 0) {
      return value + ',00 zł';
    } else {
      return value + ' zł';
    }

  }

}
