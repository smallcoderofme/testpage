import { Component, OnInit } from '@angular/core';
import { UserService } from '../greeting/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-authorize',
    styleUrls: ['./authorize.component.css'],
    templateUrl: './authorize.component.html'
})

export class AuthorizeComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) {}
    ngOnInit() {
        const verifyCookie = this.userService.verifyCookie();
        console.log('AuthorizeComponent: ', verifyCookie);
        if ( !verifyCookie ) {
            this.router.navigateByUrl('/auth/login');
        }
    }
}
