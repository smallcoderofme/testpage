import { Component } from '@angular/core';
import { UserService, UserServiceConfig } from '../greeting/user.service';

@Component({
  selector: 'app-greeting',
  styleUrls: ['./greeting.component.css'],
  templateUrl: './greeting.component.html',
})
export class GreetingComponent {
  title = 'S6I \' Site';
  user: UserServiceConfig;
  constructor(private userService: UserService) {
    this.userService.loginUser.subscribe( value => {
      this.user = value;
      console.log('greeting: ', value);
    });
  }

  signout() {
    console.log('logout');
    this.userService.removeUserInfo();
    // if () {

    // }
  }
}
