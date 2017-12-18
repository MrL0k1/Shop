import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService} from '../common/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [DataService]
})
export class MenuComponent implements OnInit {

  categories: Array<any>;
  filteringText = "";

  @Output() setCategoryEmitter = new EventEmitter<string>();
  @Output() setFilterTextEmitter = new EventEmitter<string>();
  @Output() cleanFiltersEmitter = new EventEmitter<any>();

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataService.getProductCategory().subscribe(categories => {
    this.categories = categories;
    this.categories = this.categories
      .map(category => {
        return {name: category, selected: false}
      })
      .sort();
    });
  }

    cleanFilters(){
      this.filteringText = "";
      this.categories.forEach(category => {
        category.selected = false;
      });
      this.cleanFiltersEmitter.emit();
    }

    setCategory(category){
      this.setCategoryEmitter.emit(category);
    }

    onFilteringTextChange(text){
      this.setFilterTextEmitter.emit(text)
    }
}
