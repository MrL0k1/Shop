import {Component, OnInit} from '@angular/core';
import {AuthService} from '../common/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: object = {
    login: null as String,
    password: null as String
  };

  private isError: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  signIn(credentials) {
    if (!credentials.login || !credentials.password) {
      this.isError = false;
      return;
    }
    return this.authService.authenticate(this.credentials)
      .subscribe(result => {
        if (!result) {
          this.isError = false;
        } else {
          this.credentials = {
            login: '',
            password: ''
          };
        }
      });
  }

}
