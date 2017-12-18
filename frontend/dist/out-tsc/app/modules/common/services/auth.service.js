var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
var AuthService = (function () {
    function AuthService(http) {
        this.http = http;
        this.BACKEND = 'http://localhost:3000';
    }
    AuthService.prototype.authenticate = function (credentials) {
        return this.http.post(this.BACKEND + '/api/user/auth', {
            email: credentials.login,
            password: credentials.password
        }).map(function (response) {
            var result = response['_body'];
            if (result) {
                localStorage.setItem('token', result);
                return true;
            }
            return false;
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
    };
    AuthService.prototype.isLoggedIn = function () {
        var jwtHelper = new JwtHelper();
        var token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        return !(jwtHelper.isTokenExpired(token));
    };
    AuthService.prototype.currentUser = function () {
        var token = localStorage.getItem('token');
        if (!token) {
            return null;
        }
        return new JwtHelper().decodeToken(token);
    };
    AuthService.prototype.isAdmin = function () {
        var token = localStorage.getItem('token');
        if (!token) {
            return false;
        }
        else {
            var user = new JwtHelper().decodeToken(token);
            if (user.role === 'admin') {
                return true;
            }
        }
    };
    AuthService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http])
    ], AuthService);
    return AuthService;
}());
export { AuthService };
//# sourceMappingURL=/home/darek/Documents/freelancer/wojstore/SportShop/frontend/src/app/modules/common/services/auth.service.js.map