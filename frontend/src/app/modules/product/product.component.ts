import {Component, OnInit, Input} from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: any;

  amount: number = 0;
  order: number = 0;
  tempPrice: number = 0;
  socket = io('http://localhost:8000');

  constructor() {
  }

  ngOnInit() {
    this.tempPrice = 0;
    this.product.order = 0;
    console.log(this.product);
    this.socket.on('promo', (discount) => {
      if (discount.id === this.product.id) {
        this.product.price = discount.price;
      }
    });
  }

  addToCart(product) {
    const items = localStorage.getItem('cart');
    if (!items) {
      localStorage.setItem('cart', JSON.stringify(product));
    } else {
      localStorage.setItem('cart', items + ',' + JSON.stringify(product));
    }
  }

  countPrice() {
    if (this.product.order) {
      this.tempPrice = this.product.price * (this.product.order);
    } else {
      this.tempPrice = 0;
    }
  }

  addOrder() {
    this.product.order++;
    this.product.amount--;
    this.countPrice();
  }

  removeOrder() {
    if (this.product.order === 0) {
      return;
    }
    this.product.order--;
    this.product.amount++;
    this.countPrice();
  }

}
