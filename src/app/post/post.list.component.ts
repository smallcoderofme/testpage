import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post } from '../type.struct';
import { GlobalConfig } from '../GlobalConfig';

@Component({
    styleUrls: ['./post.list.component.css'],
    providers: [GlobalConfig],
    template: `
    <div class="row">
        <div class="col-sm-9 col-lx-9">
            <ul>
                <li *ngFor="let post of postList" class="content">
                    <app-post [post] = "post"></app-post>
                </li>
            </ul>
        </div>
        <div class="col-sm-3 col-lx-3">
            <div class="side">
                <div class="bg-primary font-weight-bold p-2 mb-2">最近更新</div>
                <div class="p-1" *ngFor="let post of postList; let i =  index;"><a href="javascript:;">{{i+1}} {{ post.name }}</a></div>
            </div>
            <div class="side">
                <div class="bg-primary font-weight-bold p-2 mb-2">热门文章</div>
                <div class="p-1" *ngFor="let post of postList; let i =  index;"><a href="javascript:;">{{i+1}} {{ post.name }}</a></div>
            </div>
        </div>
    </div>
    `
})
export class PostListComponent implements OnInit {
    postList: Post[];
    constructor(private postService: PostService){}
    ngOnInit() {
        this.postService.get_posts().subscribe(res => {
          this.postList = res.list;
        }, error => {
        }, () => {
        });
    }
}
