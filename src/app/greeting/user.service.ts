import {Inject, Injectable, Optional} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AES, enc } from 'crypto-js';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';

// import { PLATFORM_ID } from '@angular/core';
// import { isPlatformBrowser, isPlatformServer } from '@angular/common';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

const storageUser = 'S6I';
const defaultCName = 'Authorizeation_s6i';
export class UserServiceConfig {
  userName = 'Traveler';
  verify = false;
  authorization = '';
  userId = null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo = new UserServiceConfig();
  public loginUser: BehaviorSubject<UserServiceConfig>;
  private cookieVerify = false;
  constructor(@Inject(DOCUMENT) private document, private http: HttpClient, @Optional() config?: UserServiceConfig) { //
    if (config) { this.userInfo.userName = config.userName; }
    const cookieUserName = this.getCookie(defaultCName);
    if (cookieUserName !== null) {
      this.userInfo =  JSON.parse(cookieUserName);
      // console.log('get cookie:', this.userInfo);
      if (this.userInfo.userName !== 'Traveler') { this.cookieVerify = true; }
      else { this.cookieVerify = false; }
    }
    this.loginUser = new BehaviorSubject<UserServiceConfig>(this.userInfo);
    this.loginUser.subscribe(value => {
      // console.log('login:', value);
      this.setUserInfo(value, !this.cookieVerify);
    });
  }

  getUserInfo(): UserServiceConfig {
    // this.m_UserName = localStorage.getItem(strogeUser);
    return this.userInfo;
  }

  setUserInfo(user: UserServiceConfig, storage = false): void {
    // console.log('setUserInfo:', user, storage);
    this.userInfo = user;
    console.log('setUserInfo', storage);
    if ( storage ) {
      // this.setCookie(defultTName, JSON.stringify({ token: user.userId }), 1)
      this.setCookie(defaultCName, JSON.stringify({userName: user.userName, verify: user.verify, authorization: user.authorization}), 0.25);
    }
    // localStorage.setItem(strogeUser, username);
  }

  removeUserInfo(): void {
    this.cookieVerify = false;
    this.delCookie(defaultCName, this.getCookie(defaultCName));
    this.loginUser.next({ userName: 'Traveler', authorization: '', verify: false, userId: null });
  }

  verifyCookie(): boolean {
    const cookie = JSON.parse(this.getCookie(defaultCName));
    if (cookie.userName !== 'Traveler') {
      return true;
    }
    return false;
  }
  private setCookie(cName: string, cValue: string, days: number): void {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 3600 * 1000));
    this.document.cookie = cName + '=' + AES.encrypt(cValue, storageUser).toString() + '; expires=' + date.toUTCString() + '; path=/';
  }
  private getCookie(cName: string): string {
    const name = cName + '=';
    const decodedCookie = decodeURIComponent(this.document.cookie);
    const ca = decodedCookie.split(';');
    for ( let c of ca ) {
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          const bytes  = AES.decrypt(c.substring(name.length, c.length), storageUser);
          return bytes.toString(enc.Utf8);
        }
      }
    return null;
  }
  public get_token(): string {
    const result: any = this.getCookie(defaultCName);
    if (result) {
      return 'Bearer ' + JSON.parse(result).authorization;
    }
    return null;
  }
  private delCookie(cName: string, cValue: string): void {
    this.setCookie(cName, cValue, -1);
  }

  public login(username: string, password: string): Observable<HttpResponse<any>> {
    return this.http.post<any>(environment.host + '/authorization/login', JSON.stringify({ username: username, password: password }), httpOptions).pipe();
  }

  public register(username: string, password: string): Observable<HttpResponse<any>> {
    // httpOptions['observe'] = 'response';
    // tslint:disable-next-line: object-literal-shorthand
    return this.http.post<any>(environment.host + '/register', { username: username, password: password }, httpOptions);
  }

  // public get_user_id(): string {
  //   const name = defultTName + '=';
  //   const decodedCookie = decodeURIComponent(this.document.cookie);
  //   const ca = decodedCookie.split(';');
  //   for ( let c of ca ) {
  //       while (c.charAt(0) === ' ') {
  //           c = c.substring(1);
  //       }
  //       if (c.indexOf(name) === 0) {
  //         const bytes  = AES.decrypt(c.substring(name.length, c.length), storageUser);
  //         return JSON.parse(bytes.toString(enc.Utf8)).token;
  //       }
  //     }
  //   return null;
  // }

  private remove_header_response(token:string) {
    delete httpOptions['observe'];
  }
}
