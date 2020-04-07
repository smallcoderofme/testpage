import { Component } from '@angular/core';
import { UserService } from '../greeting/user.service';

@Component({
  selector: 'app-greeting',
  styleUrls: ['./greeting.component.css'],
  templateUrl: './greeting.component.html',
})
export class GreetingComponent {
  title = 'S6I \' Site';
  user = '';

  constructor(userService: UserService) {
    userService.loginUser.subscribe( value => {
      this.user = value.userName;
    });
  }
}
