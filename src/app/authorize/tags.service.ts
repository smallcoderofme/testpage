import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../greeting/user.service';
import { NotAuthorization } from '../app-error';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private http: HttpClient, private userService: UserService) { }

  createTag(name: string): Observable<any> {
    const token: string = this.userService.get_token();
    const userId: string = this.userService.get_user_id();
    if ( !token || !userId ) {
      return NotAuthorization.getInstance();
    }
    httpOptions.headers = httpOptions.headers.set('x-xsrf-token', token);
    return this.http.post<any>(environment.host + '/post_tag/' + name, {}, httpOptions);
  }

  get_tags(): Observable<any> {
    const token: string = this.userService.get_token();
    const userId: string = this.userService.get_user_id();
    if ( !token || !userId ) {
      return NotAuthorization.getInstance();
    }
    httpOptions.headers = httpOptions.headers.set('x-xsrf-token', token);
    return this.http.post<any>(environment.host + '/get_tags/' + name, {user_id: userId}, httpOptions);
  }

  delete_tag() {
    const token: string = this.userService.get_token();
    const userId: string = this.userService.get_user_id();
    if ( !token || !userId ) {
      return NotAuthorization.getInstance();
    }
    httpOptions.headers = httpOptions.headers.set('x-xsrf-token', token);
    return this.http.post<any>(environment.host + '/delete_tag/' + name, {}, httpOptions);
  }
}
