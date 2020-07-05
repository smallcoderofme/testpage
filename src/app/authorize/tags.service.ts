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

  createTag(tagName: string): Observable<any> {
    const token: string = this.userService.get_token();
    if ( !token ) {
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.post<any>(environment.host + '/authorization/create_tag', {name: tagName}, httpOptions);
  }

  get_tags(): Observable<any> {
    return this.http.get<any>(environment.host + '/tags/');
  }

  get_tags_by_userId() {
    const token: string = this.userService.get_token();
    if ( !token ) {
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.post<any>(environment.host + '/authorization/tag/', {}, httpOptions).pipe();
  }

  delete_tag(tagId: string) {
    const token: string = this.userService.get_token();
    if ( !token ) {
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.post<any>(environment.host + '/authorization/delete_tag/' + tagId, {}, httpOptions);
  }
  setJwt(token) {
    if (!httpOptions.headers.has('Authorization')) {
      httpOptions.headers = httpOptions.headers.append('Authorization', token);
      // httpOptions.headers = httpOptions.headers.set('Authorization', token);
    }
  }
}
