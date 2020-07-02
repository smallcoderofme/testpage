import { Component } from '@angular/core';
import { UserService, UserServiceConfig } from '../greeting/user.service';
import { Router } from '@angular/router';

const RANDOM_WORDS: string[] = [
  '"你若要喜爱你自己的价值，你就得给世界创造价值。“ ——歌德',
  '“君子赠人以言，庶人赠人以财。“ ——荀况',
  '“对人不尊敬，首先就是对自己的不尊敬。“ ——惠特曼',
  '“自我控制是最强者的本能。“ ——萧伯纳'
];

@Component({
  selector: 'app-greeting',
  styleUrls: ['./greeting.component.css'],
  templateUrl: './greeting.component.html',
})
export class GreetingComponent {
  title = 'S6I \' Site';
  user: UserServiceConfig;
  words: string;
  constructor(private userService: UserService, private router: Router) {
    this.userService.loginUser.subscribe( value => {
      this.user = value;
      console.log('greeting: ', value);
    });
    this.randomWords(true);
  }

  signout() {
    console.log('logout');
    this.userService.removeUserInfo();
    if (this.router.url.indexOf('auth') !== -1) {
      this.router.navigateByUrl('/auth/login');
    }
  }

  randomWords(immediately: boolean) {
    if (immediately) {
      this.words = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];
    }
    setInterval(() => {
      this.words = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];
    }, 30000);
  }
}
