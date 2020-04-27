import { CanActivate } from '@angular/router';
import { UserService } from '../greeting/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private userService: UserService) {

    }
    canActivate(): Observable<boolean>{
        // const loggedIn: boolean = this.userService.verifyCookie();
        // if (!loggedIn){
        //     console.log('not login');
        // }
        // return loggedIn;
        return new Observable( subscriber => {
            subscriber.next(this.userService.verifyCookie());
            subscriber.complete();
        })
    }
}
