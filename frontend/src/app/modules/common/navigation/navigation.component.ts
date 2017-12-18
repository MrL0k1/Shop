import {Component, OnChanges, OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnChanges {

  private login = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.login = this.authService.isLoggedIn();
  }

  ngOnChanges() {
    this.login = this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.login = false;
  }

}
