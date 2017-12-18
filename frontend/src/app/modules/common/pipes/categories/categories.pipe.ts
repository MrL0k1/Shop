import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(products: any, selectedCategories: any, filteredCount: any): any {
    if(!products) return null;

    if(selectedCategories.length == 0){
      filteredCount.count = products.length;
      return products;
    }

    let filtered =  products.filter(product => {
      return selectedCategories.includes(product['category'])
    });

    filteredCount.count = filtered.length;
    return filtered;
  }


}
