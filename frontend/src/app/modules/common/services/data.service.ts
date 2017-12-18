import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  BACKEND: String = 'http://localhost:3000';

  data: Array<Object>;


  constructor(private http: Http) {
  }

  getProduct() {
    return this.http.get(this.BACKEND + '/api/products')
      .map(response => response.json());
  }

  getProductById(id) {
    return this.http.get(this.BACKEND + `/api/product/${id}`)
      .map(response => response.json());
  }

  getProductCategory() {
    return this.http.get(this.BACKEND + '/api/category')
      .map(response => response.json());
  }

  deleteProductById(id) {
    return this.http.delete(this.BACKEND + `/api/product/delete/${id}`)
      .map(response => response.json());
  }

  createNewProduct(product) {
    return this.http.post(this.BACKEND + '/api/product', product);
  }

  updateProduct(product) {
    return this.http.post(this.BACKEND + '/api/product/update', product);
  }

  getOrder() {
    return this.http.get(this.BACKEND + '/api/order')
      .map(response => response.json());
  }

  updateOrder(order) {
    return this.http.post(this.BACKEND + '/api/order/update', order)
      .map(response => response.json());
  }

  createNewOrder(order) {
    return this.http.post(this.BACKEND + '/api/order/add', order)
      .map(response => response.json());
  }


}
