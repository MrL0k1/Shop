var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import * as io from 'socket.io-client';
var ProductComponent = (function () {
    function ProductComponent() {
        this.amount = 0;
        this.order = 0;
        this.tempPrice = 0;
        this.socket = io('http://localhost:8000');
    }
    ProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.tempPrice = 0;
        this.product.order = 0;
        console.log(this.product);
        this.socket.on('promo', function (discount) {
            if (discount.id === _this.product.id) {
                _this.product.price = discount.price;
            }
        });
    };
    ProductComponent.prototype.addToCart = function (product) {
        var items = localStorage.getItem('cart');
        if (!items) {
            localStorage.setItem('cart', JSON.stringify(product));
        }
        else {
            localStorage.setItem('cart', items + ',' + JSON.stringify(product));
        }
    };
    ProductComponent.prototype.countPrice = function () {
        if (this.product.order) {
            this.tempPrice = this.product.price * (this.product.order);
        }
        else {
            this.tempPrice = 0;
        }
    };
    ProductComponent.prototype.addOrder = function () {
        this.product.order++;
        this.product.amount--;
        this.countPrice();
    };
    ProductComponent.prototype.removeOrder = function () {
        if (this.product.order === 0) {
            return;
        }
        this.product.order--;
        this.product.amount++;
        this.countPrice();
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], ProductComponent.prototype, "product", void 0);
    ProductComponent = __decorate([
        Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], ProductComponent);
    return ProductComponent;
}());
export { ProductComponent };
//# sourceMappingURL=/home/darek/Documents/freelancer/wojstore/SportShop/frontend/src/app/modules/product/product.component.js.map