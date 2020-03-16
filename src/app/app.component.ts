import { Component, OnInit, OnChanges } from '@angular/core';
// import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  title = 'testpage';
  user;

  constructor( private authService: AuthService, private location: Location, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.setCallBack(this, this.onAuthStateChange);
    const cookie = this.authService.getItem('Authorization');
    if (!cookie || cookie.length < 1) {
      return;
    }
    const authorization = atob(cookie).split(',');
    this.user = { username: authorization[0], password: authorization[1] };
  }
  onAuthStateChange(self) {
    console.log('onAuthStateChange', self);
    const cookie = self.authService.getItem('Authorization');
    if (!cookie || cookie.length < 1) {
      return;
    }
    console.log('onAuthStateChange successfully!');
    const authorization = atob(cookie).split(',');
    this.user = { username: authorization[0], password: authorization[1] };
  }
  ngOnChanges() {
    console.log('changed');
  }
  logout() {
    if (this.authService.removeItem('Authorization', '/', '127.0.0.1') ) {
      this.user = null;
      if (this.location.path().indexOf('auth') !== -1) {
        this.router.navigateByUrl('/home');
      }
      console.log('logout remove success');
    }
  }
}
