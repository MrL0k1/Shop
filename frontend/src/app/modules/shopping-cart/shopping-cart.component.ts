import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items: any[];
  summary = 0;

  constructor() {
  }

  ngOnInit() {
    const temp = localStorage.getItem('cart');
    this.items = JSON.parse('[' + temp + ']');
    if (!this.items[0].length) {
      this.items.splice(0, 1);
    }
    this.calculateSummary();
  }

  removeFromCart(index) {
    this.items.splice(index, 1);
    this.calculateSummary();
    localStorage.setItem('cart', JSON.stringify(this.items));
  }

  calculateSummary() {
    if (this.items.length > 0) {
      this.summary = 0;
      for (let i = 0; i < this.items.length; i++) {
        this.summary += (this.items[i].price * (this.items[i].order || 1));
      }
    }
  }

  increaseAmount(index) {
    if (!this.items[index].order) {
      this.items[index].order = 1;
    }
    this.items[index].amount--;
    this.items[index].order++;
    this.calculateSummary();
  }

  decreaseAmount(index) {
    if (0 === this.items[index].amount) {
      return;
    }
    if (!this.items[index].order) {
      this.items[index].order = 1;
    }
    this.items[index].amount++;
    this.items[index].order--;
    this.calculateSummary();
  }

}
