import {Component, OnInit} from '@angular/core';
import {DataService} from '../common/services/data.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrderComponent implements OnInit {

  notRealized: Array<object> = [];
  realized: Array<object> = [];
  name: string = '';

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getOrder().subscribe(order => {
      this.notRealized = order.notRealized;
      this.realized = order.realized;
    })
  }

  next(index, order) {
    order.realized = true;
    this.realized.push(order);
    this.notRealized.splice(index, 1);
    this.dataService.updateOrder(order).subscribe();
  }

  previous(index, order) {
    order.realized = false;
    this.notRealized.push(order);
    this.realized.splice(index, 1);
    this.dataService.updateOrder(order).subscribe();
  }

  getProductById(id) {
    this.dataService.getProductById(id).subscribe(product => {
      if(product){
        this.name = product.name;
      }else {
        this.name = 'Nieznany produkt';
      }
    });
  }

}
