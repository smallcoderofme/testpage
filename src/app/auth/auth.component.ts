import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MemaryHttpSupport } from '../memary-http-support';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  /**
   * selected param: 1 tags, 2 post
   */
  status = { logined: false, selected: 1 };
  user;
  loginInfo = {uname: '', pword: ''};
  tags;
  tempTag = {name: ''};
  constructor( private authService: AuthService, private httpServer: MemaryHttpSupport ) { }

  ngOnInit(): void {

    this.httpServer.getTags().subscribe(next=>{
      this.tags = next;
    });

    const cookie = this.authService.getItem('Authorization');
    if (!cookie || cookie.length < 1) {
      return;
    }
    const authorization = atob(cookie).split(',');
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
  selectedTopic(topic) {
    this.status.selected = topic;
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
  createPost() {
  }
}
