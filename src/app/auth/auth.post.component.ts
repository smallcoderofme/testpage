import { Component, OnInit } from '@angular/core';
import { MemaryHttpSupport } from '../memary-http-support';
import { Globals } from '../globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.post.component.html',
  styleUrls: ['./auth.post.component.css'],
})
export class AuthPostComponent implements OnInit {
    posts: any[];
    constructor(private httpServer: MemaryHttpSupport, public global: Globals, private router: Router) {}
    ngOnInit() {
        if (!this.global.userInfo) {
            this.router.navigateByUrl('auth/manage');
        }
        this.getPosts();
    }
    createPost() {
    }
    getPosts() {
      this.httpServer.getPosts().subscribe(data => {
        this.posts = data;
      }, complete => {
        // console.log('get posts');
      });
    }
    onClick(post, evt) {
    }
}
