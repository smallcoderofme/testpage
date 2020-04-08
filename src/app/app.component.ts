import { Component } from '@angular/core';
import { UserService } from './greeting/user.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private userSerivce: UserService){}
  getUsername() {
    console.log(this.userSerivce.userName);
  }
  setUsername() {
    this.userSerivce.loginUser.next({userName: 'sunshuai'});
  }
}
