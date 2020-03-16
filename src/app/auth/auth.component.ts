import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  status = { logined: false };
  user;
  loginInfo = {uname: '', pword: ''};
  tags = [
    { name: 'art', id: 'djs3b423brwe' },
    { name: 'life', id: 'djs3as423brwe' },
    { name: 'view', id: 'djs3b42sad3brwe' } ];
  tempTag = {name: ''};
  constructor( private authService: AuthService ) { }

  ngOnInit(): void {
    const cookie = this.authService.getItem('Authorization');
    if (cookie.length < 1) {
      return;
    }
    const authorization = atob(cookie).split(',');
    console.log('ngOnInit', authorization);
    this.user = {username: authorization[0], password: authorization[1]};
  }
  login() {
    // verify
    this.user = { username: this.loginInfo.uname, password: this.loginInfo.pword };
    const date: Date = new Date();
    const msecond: number = 1 * 3600 * 1000;
    date.setTime(date.getTime() + msecond);
    this.authService.setItem('Authorization', btoa(this.user.username + ',' + this.user.password), date, '/', '127.0.0.1', false);
    this.authService.run();
  }

  newTag() {
    const tag = { name: this.tempTag.name, id: (Math.random() * 99999999).toString() };
    this.tags.push( tag );
    this.tempTag.name = '';
  }

  delTag(tagId: string) {
    for (let index = 0; index < this.tags.length; index++) {
      const element = this.tags[index];
      if ( element.id === tagId ) {
        this.tags.splice(index, 1);
        return;
      }
    }
  }
}
