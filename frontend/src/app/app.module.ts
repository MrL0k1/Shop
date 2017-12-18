import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {OfferComponent} from './modules/offer/offer.component';
import {HomeComponent} from './modules/home/home.component';
import {ProductComponent} from './modules/product/product.component';
import {MenuComponent} from './modules/menu/menu.component';
import {ZlPipe} from './modules/common/pipes/zl/zl.pipe';
import {PaginationComponent} from './modules/pagination/pagination.component';
import {CategoriesPipe} from './modules/common/pipes/categories/categories.pipe';
import {PaginationPipe} from './modules/common/pipes/pagination/pagination.pipe';
import {NamePipe} from './modules/common/pipes/name/name.pipe';
import {SingleProductComponent} from './modules/single-product/single-product.component';
import {NavigationComponent} from './modules/common/navigation/navigation.component';
import {AddProductComponent} from './modules/add-product/add-product.component';
import {EditProductComponent} from './modules/edit-product/edit-product.component';
import {LoginComponent} from './modules/login/login.component';
import {DataService} from './modules/common/services/data.service';
import {AuthService} from './modules/common/services/auth.service';
import {SingleEditProductComponent} from './modules/edit-product/single-edit-product/single-edit-product.component';
import {InfoComponent} from './modules/info/info.component';
import {ShoppingCartComponent} from './modules/shopping-cart/shopping-cart.component';
import {OrderComponent} from './modules/order/order.component';
import {AdminOrderComponent} from './modules/admin-orders/admin-orders.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'product/:id',
    component: SingleProductComponent
  },
  {
    path: 'add',
    component: AddProductComponent
  },
  {
    path: 'edit',
    component: EditProductComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'shipping',
    component: OrderComponent
  },
  {
    path: 'orders',
    component: AdminOrderComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    OfferComponent,
    HomeComponent,
    ProductComponent,
    MenuComponent,
    ZlPipe,
    PaginationComponent,
    CategoriesPipe,
    PaginationPipe,
    NamePipe,
    SingleProductComponent,
    NavigationComponent,
    AddProductComponent,
    EditProductComponent,
    LoginComponent,
    SingleEditProductComponent,
    InfoComponent,
    SingleEditProductComponent,
    ShoppingCartComponent,
    OrderComponent,
    AdminOrderComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [
    DataService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
