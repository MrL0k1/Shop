import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {JwtHelper} from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  BACKEND: String = 'http://localhost:3000';

  constructor(private http: Http) {
  }

  authenticate(credentials) {
    return this.http.post(this.BACKEND + '/api/user/auth', {
      email: credentials.login,
      password: credentials.password
    }).map(response => {
      const result = response['_body'];
      if (result) {
        localStorage.setItem('token', result);
        return true;
      }
      return false;
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelper();
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !(jwtHelper.isTokenExpired(token));
  }

  currentUser() {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    return new JwtHelper().decodeToken(token);
  }

  isAdmin() {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }else {
      const user = new JwtHelper().decodeToken(token);
      if(user.role === 'admin'){
        return true;
      }
    }
  }

}
