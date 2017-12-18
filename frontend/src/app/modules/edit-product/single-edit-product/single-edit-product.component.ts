import {Component, Input, OnInit} from '@angular/core';
import {DataService} from "../../common/services/data.service";
import * as io from 'socket.io-client';

@Component({
  selector: 'app-single-edit-product',
  templateUrl: './single-edit-product.component.html',
  styleUrls: ['./single-edit-product.component.css']
})
export class SingleEditProductComponent implements OnInit {

  edit: boolean = false;
  tempProduct: object = {};
  discountOn = false;
  socket = io('http://localhost:8000');
  percent: number;
  time: number;
  categ: Array<string> = [];

  @Input() product: object;

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getProductCategory().subscribe(category => {
      this.categ = category;
    });
  }

  setEdit() {
    this.edit = !this.edit;
    this.tempProduct = this.product;
  }

  saveProduct() {
    this.dataService.updateProduct(this.product).subscribe(value => {
    });
    this.setEdit();
  }

  cancel() {
    this.product = this.tempProduct;
    this.setEdit();
  }

  deleteProduct(id) {
    this.edit = false;
    this.dataService.deleteProductById(id).subscribe(value => {
    })
  }

  discount() {
    this.discountOn = true;
  }

  send() {
    this.discountOn = false;
    console.log(this.percent, this.time);
    this.product['percent'] = this.percent;
    this.product['time'] = this.time;
    this.socket.emit('discount', this.product);
  }

}
