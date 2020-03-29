import { Component, Input } from '@angular/core';
import { UserService }      from '../greeting/user.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
})
export class GreetingComponent {
  title = 'S6I \' Site';
  user = '';

  constructor(userService: UserService) {
    this.user = userService.userName;
  }
}
