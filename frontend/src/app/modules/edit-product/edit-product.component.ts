import { Component, OnInit } from '@angular/core';
import { DataService } from '../common/services/data.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  offer: Array<object> = [];

  page = 1;
  limit = 3;
  filteredCount = {count: 0};

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProduct().subscribe(offer => this.offer = offer);
  }

  prevPage(event: boolean): void {
    this.page--;
  }

  nextPage(): void {
    this.page++;
  }

  goToPage(pageNr: number): void {
    this.page = pageNr;
  }

}
