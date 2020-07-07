import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { UserService } from '../greeting/user.service';
import { NotAuthorization } from '../app-error';
import { Post } from '../type.struct';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private userService: UserService) { }

  get_post_by_id(postId: string): Observable<any> {
    return this.http.get<any>(environment.host + '/posts/list/' + postId).pipe();
  }
  get_posts(): Observable<any> {
    return this.http.get<any>(environment.host + '/posts/list').pipe();
  }
  get_posts_snapshots(): Observable<any> {
    const token: string = this.userService.get_token();
    if (!token) {
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.post<any>(environment.host + '/authorization/posts/snapshot_list', {}, httpOptions).pipe();
  }
  get_admin_posts(): Observable<any> {
    // const userId: string = this.userService.get_user_id();
    const token: string = this.userService.get_token();
    if (!token) {
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.get<any>(environment.host + '/posts_preview/').pipe();
  }

  update_post(id: string, post: Post): Observable<any> {
    // const userId: string = this.userService.get_user_id();
    const token: string = this.userService.get_token();
    if (!token) {
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.post<any>(environment.host + '/authorization/update_post/' + id, post, httpOptions).pipe();
  }
  delete_post(postId: string): Observable<any> {
    const token: string = this.userService.get_token();
    if (!token) {
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.post<any>(environment.host + '/authorization/delete_post/' + postId, null).pipe();
  }
  commit_comment(postId: string, comment: any): Observable < any > {
    return this.http.post<any>(environment.host + '/post_comment/' + postId, comment, httpOptions).pipe();
  }

  create_post(post: Post): Observable<any> {
    // const userId: string = this.userService.get_user_id();
    const token: string = this.userService.get_token();
    if (!token) {
      console.log('Error: Not authorization.');
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.post<any>(environment.host + '/authorization/create_post', post, httpOptions).pipe();
  }

  request_change_publish_status(postId: string, overt: boolean): Observable<any> {
    // const userId: string = this.userService.get_user_id();
    const token: string = this.userService.get_token();
    if (!token) {
      return NotAuthorization.getInstance();
    }
    this.setJwt(token);
    return this.http.post<any>(environment.host + '/request_change_public/', { publish : overt } ).pipe();
  }

  setJwt(token) {
    if (!httpOptions.headers.has('Authorization')) {
      // httpOptions.headers.append('Authorization', token);
      httpOptions.headers = httpOptions.headers.set('Authorization', token);
    }
  }
}
