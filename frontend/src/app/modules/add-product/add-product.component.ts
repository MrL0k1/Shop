import {Component, OnInit} from '@angular/core';
import {DataService} from '../common/services/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: object = {
    name: null as String,
    category: null as String,
    price: null as Number,
    count: null as Number,
    image: null as String,
    description: null as String
  };

  categ: Array<string>;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getProductCategory().subscribe(categories => this.categ = categories);
  }

  createNewProduct(product) {
    this.dataService.createNewProduct(product).subscribe();

  }

}
