import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AES, enc } from 'crypto-js';

const storageUser = 'S6I';
const defaultCName = 'Authorization_s6i';
export class UserServiceConfig {
  userName = 'Traveler';
  verify = false;
  userId = null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo = new UserServiceConfig();
  public loginUser: BehaviorSubject<UserServiceConfig>;
  private cookieVerify = false;
  constructor(@Optional() config?: UserServiceConfig) {
    if (config) { this.userInfo.userName = config.userName; }
    const cookieUserName = this.getCookie(defaultCName);
    if (cookieUserName !== '') {
      this.userInfo =  JSON.parse(cookieUserName);
      console.log('get cookie:', this.userInfo);
      if (this.userInfo.userName !== 'Traveler') { this.cookieVerify = true; }
      else { this.cookieVerify = false; }
    }
    this.loginUser = new BehaviorSubject<UserServiceConfig>(this.userInfo);
    this.loginUser.subscribe(value => {
      this.setUserInfo(value, !this.cookieVerify);
    });
  }

  getUserInfo() {
    // this.m_UserName = localStorage.getItem(strogeUser);
    return this.userInfo;
  }

  setUserInfo(user: UserServiceConfig, storage = false) {
    console.log('setUserInfo:', user, storage);
    this.userInfo = user;
    if ( storage ) {
      this.setCookie(defaultCName, JSON.stringify({userName: user.userName, verify: user.verify}), 1);
    }
    // localStorage.setItem(strogeUser, username);
  }

  removeUserInfo() {
    this.cookieVerify = false;
    this.delCookie(defaultCName, this.getCookie(defaultCName));
    this.loginUser.next({ userName: 'Traveler', verify: false, userId: null });
  }

  verifyCookie(): boolean {
    const cookie = JSON.parse(this.getCookie(defaultCName));
    if (cookie.userName !== 'Traveler') {
      return true;
    }
    return false;
  }
  private setCookie(cName: string, cValue: string, days: number) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 3600 * 1000));
    document.cookie = cName + '=' + AES.encrypt(cValue, storageUser).toString() + '; expires=' + date.toUTCString() + '; path=/';
  }
  private getCookie(cName: string): string {
    const name = cName + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
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
    return '';
  }
  private delCookie(cName: string, cValue: string) {
    this.setCookie(cName, cValue, -1);
  }
}
