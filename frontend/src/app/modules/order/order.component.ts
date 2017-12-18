import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../common/services/data.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent {

  form = new FormGroup({
    persona: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  });
  items: any[];

  constructor(private dataService: DataService, private router: Router) {

  }

  get persona() {
    return this.form.get('persona');
  }

  get address() {
    return this.form.get('address');
  }

  addOrder() {
    const persona = this.form['_value'].persona;
    const address = this.form['_value'].address;


    const temp = localStorage.getItem('cart');
    this.items = JSON.parse('[' + temp + ']');
    if (!this.items[0].length) {
      this.items.splice(0, 1);
    }

    let products = this.items.map(value => {
      return {"_id": value._id, "quantity": value.order}
    });

    this.dataService.createNewOrder({
      "name": persona,
      "address": address,
      "products": products,
      "realized": false
    }).subscribe();
    localStorage.setItem('cart', "[]");
    this.router.navigate(['']);
  }
}
