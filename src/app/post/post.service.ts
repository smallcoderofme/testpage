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

  get_posts(): Observable<any> {
    return this.http.get<any>(environment.host + '/posts_preview/');
  }
  get_admin_posts(): Observable<any> {
    const userId: string = this.userService.get_user_id();
    const token: string = this.userService.get_token();
    if (!userId || !token) {
      return NotAuthorization.getInstance();
    }
    return this.http.get<any>(environment.host + '/posts_preview/' + userId);
  }
  get_post_detail(postId: string): Observable<any> {
    return this.http.get<any>(environment.host + '/post_detail/' + postId);
  }

  update_post(post: Post): Observable<any> {
    const userId: string = this.userService.get_user_id();
    const token: string = this.userService.get_token();
    if (!userId || !token) {
      return NotAuthorization.getInstance();
    }
    return this.http.post<any>(environment.host + '/update_post/' + post.post_id, post);
  }
  delete_post(postId: string): Observable<any> {
    const userId: string = this.userService.get_user_id();
    const token: string = this.userService.get_token();
    if (!userId || !token) {
      return NotAuthorization.getInstance();
    }
    return this.http.post<any>(environment.host + '/delete_post/' + postId, null);
  }
  commit_comment(postId: string, comment: any): Observable < any > {
    return this.http.post<any>(environment.host + '/post_comment/' + postId, comment, httpOptions);
  }

  get_comments(postId: string): Observable<any> {
    return this.http.get<any>(environment.host + '/get_comments/' + postId);
  }

  create_post(post: Post): Observable<any> {
    const userId: string = this.userService.get_user_id();
    const token: string = this.userService.get_token();
    if (!userId || !token) {
      return NotAuthorization.getInstance();
    }
    httpOptions.headers['x-xsrf-token'] = token;
    return this.http.post<any>(environment.host + '/create_post/', post);
  }
}