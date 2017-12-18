import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'name'
})
export class NamePipe implements PipeTransform {

  transform(products: any, filteringText: string, filteredCount: any): any {
    if(filteringText.length === 0) return products;

    let filtered = products.filter(product => {
      return product.name.toLowerCase().includes(filteringText.toLowerCase());
    });
    filteredCount.count = filtered.length;
    return filtered;
  }

}
