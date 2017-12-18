import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../common/services/data.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css'],
  providers: [DataService]
})
export class SingleProductComponent implements OnInit {

  private id: number;
  product: object = {};

  constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    this.dataService.getProductById(this.id).subscribe(product => this.product = product)
  }

}
