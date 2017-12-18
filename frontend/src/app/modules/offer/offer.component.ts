import {Component, OnInit, Input} from '@angular/core';
import {DataService} from '../common/services/data.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  offer: Array<Object> = [];
  page = 1;
  limit = 3;
  filteredCount = {count: 0};
  selectedCategories: Array<string> = [];
  filteringText = "";

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getProduct().subscribe(offer => this.offer = offer);
  }

  setCategory(category) {
    category.selected = !category.selected;
    if (category.selected) {
      this.selectedCategories.push(category.name)
    } else {
      this.selectedCategories.splice(this.selectedCategories.indexOf(category.name), 1);
    }
    this.selectedCategories = this.selectedCategories.slice(0);
    this.page = 1;
  }

  setFilterText(text) {
    this.filteringText = text;
  }

  clearFilters(event): void {
    this.filteringText = "";
    this.selectedCategories = [];
    this.page = 1;
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
