import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Router} from '@angular/router';
import { UserService } from '../greeting/user.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> | UrlTree {
        if (this.userService.verifyCookie()) {
            return true;
        }
        const tree: UrlTree = this.router.parseUrl('/auth/login');
        return tree;
        /**
        return new Observable((observer) => {
                if (this.userService.verifyCookie()) {
                    observer.next(true);
                    observer.complete();
                    return;
                }
                this.route.navigate(['/auth/login']);
                observer.next(false);
                observer.complete();
            });
        */
    }
}
