import { Component, OnInit } from '@angular/core';
// import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'testpage';
  user;

  // @ViewChild(AuthComponent)
  // private auth: AuthComponent;

  constructor(private authService: AuthService) {
    // const date: Date = new Date();
    // const msecond: number = 48 * 3600 * 1000;
    // date.setTime(date.getTime() + msecond);
    // this.authService.setItem('Authorization', btoa(this.user.username + ',' + this.user.password), date, '/', '127.0.0.1', false);
  }

  ngOnInit(): void {
    const cookie = this.authService.getItem('Authorization');
    if (cookie.length < 1) {
      return;
    }
    const authorization = atob(cookie).split(',');
    this.user = {username: authorization[0], password: authorization[1]};
  }

  logout() {
    if (this.authService.removeItem('Authorization', '/', '127.0.0.1') ) {
      this.user = null;
      console.log('logout remove success');
    }
  }
}
