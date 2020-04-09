import { Component } from '@angular/core';
import { UserService, UserServiceConfig } from '../greeting/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-greeting',
  styleUrls: ['./greeting.component.css'],
  templateUrl: './greeting.component.html',
})
export class GreetingComponent {
  title = 'S6I \' Site';
  user: UserServiceConfig;
  constructor(private userService: UserService, private router: Router) {
    this.userService.loginUser.subscribe( value => {
      this.user = value;
      console.log('greeting: ', value);
    });
  }

  signout() {
    console.log('logout');
    this.userService.removeUserInfo();
    if (this.router.url.indexOf('auth') !== -1) {
      this.router.navigateByUrl('/auth/login');
    }
  }
}
