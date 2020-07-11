import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
import { Post, PostComment } from '../type.struct';
import { GlobalConfig } from '../GlobalConfig';

@Component({
    styleUrls: ['./post.list.component.css'],
    providers: [GlobalConfig],
    template: `
    <div class="row">
        <div class="col-sm-9 col-lx-9">
            <ul>
                <li *ngFor="let post of postList" class="content">
                    <h4 class="font-weight-bold mb-2">{{ post.name }}</h4>
                    <img *ngIf="post.avatar" src="{{post.avatar}}" class="img-fluid">
                    <p>{{ post.preview }}...<a href="javascript:;" routerLink="/post/list/{{post._id}}">ReadMore</a></p>
                    <p class="border-top p-t">Date: <span class="m-r-3">{{post.createdAt | date: global.POST_DATE_FORMAT}}</span>Author: <span>{{post.author}}</span></p>
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
    constructor(private postService: PostService, public global: GlobalConfig){}
    ngOnInit() {
        // this.postList = [
        //     {
        //         title: '卡布·加塔自然公园',
        //         cover: '',
        //         preview: '位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。',
        //         created_at: '2019-03-02',
        //         author: 'Jugg',
        //         post_id: '1234564564',
        //         overt: true
        //     },
        //     {
        //         title: '萨瑟兰瀑布和奎尔湖',
        //         cover: '',
        //         preview: '新西兰的萨瑟兰瀑布和奎尔湖 (© Michael Rathmayr/plainpicture)。',
        //         created_at: '2019-03-03',
        //         author: 'Troll',
        //         post_id: '7987987444',
        //         overt: true
        //     }
        // ];
        this.postService.get_posts().subscribe(res => {
          console.log('success: ', res);
          this.postList = res.list;
        }, error => {
          console.log('failed: ', error);
        }, () => {
          console.log('complete! ');
        });
    }
}
