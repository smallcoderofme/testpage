import { Component, OnInit } from '@angular/core';
import { UserService } from '../greeting/user.service';
import { Router } from '@angular/router';
import { PopupService } from '../utils/popup.service';
import { PopupType } from '../type.struct';

@Component({
    selector: 'app-login',
    styleUrls: [],
    template: `
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4 mt-3 text-left">
            <form class="side">
                <div class="form-group">
                    <label for="exampleInputEmail1" class="pull-left col-form-label">username</label>
                    <input type="text" [(ngModel)]="loginForm.username" [ngModelOptions]="{standalone: true}" id="exampleInputEmail1" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1" class="pull-left col-form-label">password</label>
                    <input type="password" [(ngModel)]="loginForm.password" [ngModelOptions]="{standalone: true}" id="exampleInputPassword1" class="form-control" required>
                </div>
                <div class="form-group form-check">
                    <input type="checkbox"
                        [(ngModel)]="loginForm.remember"
                        [ngModelOptions]="{standalone: true}"
                        class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="exampleCheck1">remember me</label>
                </div>
                <input type="submit" class="btn btn-sm btn-success btn-block mt-4" value="login" (click)="signIn();">
            </form>
        </div>
        <div class="col-md-4"></div>
    </div>
    `
})
export class AuthorizeLoginComponent implements OnInit {
    loginForm = { username: '', password: '', remember: false };
    constructor(private userService: UserService, private router: Router, private popupSerive: PopupService) {}
    ngOnInit() {
        this.loginForm.username = '';
        this.loginForm.password = '';
        // this.loginForm.remember = true;
    }

    signUp() {
        this.userService.register(this.loginForm.username, this.loginForm.password).subscribe(res => {
            console.log('-------- success', res);
        }, error => {
            console.log('--------', error);
        });
    }

    signIn() {
        // if (this.loginForm.username !== 'sunshuai' || this.loginForm.password !== '010101') {
        //     return;
        // }
        // this.userService.loginUser.next({ userName: this.loginForm.username, authorization: 'admjjadasjd', verify: true, userId: null });
        // this.router.navigateByUrl('auth');

        this.userService.login(this.loginForm.username, this.loginForm.password).subscribe((res) => {
            // const token: string = res.headers.get('Authorization');
            // console.log('--------------login', res., res.);
            // tslint:disable-next-line: max-line-length
            this.userService.loginUser.next({ userName: res['userName'], authorization: res['jwt'], verify: true, userId: res['userId'] });
            this.router.navigateByUrl('auth');
            this.popupSerive.show("Login Success.", PopupType.Success);
            // this.userService
        }, error => {
            console.log('--------', error);
        });
    }
}
