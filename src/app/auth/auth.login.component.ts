import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.login.component.html',
  styleUrls: ['./auth.login.component.css'],
})
export class AuthLoginComponent implements OnInit {
    user;
    loginInfo = {uname: '', pword: ''};
    constructor(private authService: AuthService, public global: Globals, private router: Router) {}
    ngOnInit() {}
    login() {
        // verify
        this.user = { username: this.loginInfo.uname, password: this.loginInfo.pword };
        const date: Date = new Date();
        const msecond: number = 1 * 3600 * 1000;
        date.setTime(date.getTime() + msecond);
        this.authService.setItem('Authorization', btoa(this.user.username + ',' + this.user.password), date, '/', '127.0.0.1', false);
        this.global.userInfo = this.user;
        this.authService.run();
        this.router.navigateByUrl('/auth/manage/tags');
    }
}
