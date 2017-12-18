import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataService} from '../common/services/data.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DataService]
})
export class HomeComponent implements OnInit {

  @ViewChild('mod') mod: ElementRef;
  socket = io('http://localhost:8000');
  discount: any = {};

  constructor() {
  }

  ngOnInit() {
    let el: HTMLElement = this.mod.nativeElement as HTMLElement;
    this.socket.on('promo', (discount) => {
      if(discount){
        this.discount = discount;
        console.log(discount);
        el.click();
      }
    });
  }
}
