import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {

  transform(products: any, page: any, limit: any): any {
    if(!products) return null;
    let min = ((limit * page) - limit);
    let max = (limit * page);
    if (max > products.length) {
      max = products.length;
    }
    return products.filter((product, index) => {
      return index >= min && index < max;
    });
  }

}
