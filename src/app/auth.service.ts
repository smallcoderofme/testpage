import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }
  setCookie(key: string, value: string, exdays: number = 30) {
    const exp: Date = new Date();
    exp.setTime(exp.getTime() + exdays * 24 * 3600 * 1000);
    document.cookie = name + '=' + encodeURI(value) + ';expires=' + exp.toUTCString();
  }

  getCookie(key: string): string {
    const name: string = key + '=';
    const ca: string[] = document.cookie.split(';');
    for (let item of ca) {
      while (item.charAt(0) === ' ') {
        item = item.substring(1);
       }
      if (item.indexOf(name)  === 0) {
          return item.substring(name.length, item.length);
      }
    }
    return '';
  }

  checkCookie() {
    let user: string = this.getCookie('username');
    if (user !== '') {
        alert('Welcome again: ' + user);
    } else {
        user = prompt('Please enter your name:', '');
        if (user !== '' && user != null) {
            this.setCookie('username', user);
        }
    }
  }

  login( username: string, password: string ): Observable<HttpResponse<any>> {
    return this.http.post<any>( environment.host + '/auth/login', { uname: username, pword: password }, httpOptions );
  }

  logout( username: string, password: string ): Observable<HttpResponse<any>> {
    return this.http.post<any>( environment.host + '/auth/logout', { uname: username, pword: password }, httpOptions );
  }
}
