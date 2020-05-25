import { Component, OnInit } from '@angular/core';
import { PostService } from './post.service';
// import { take } from 'rxjs/operators';

@Component({
    styleUrls: ['./post.list.component.css'],
    template: `
    <div class="row">
        <div class="col-sm-9 col-lg-9">
            <ul>
                <li *ngFor="let post of postList" class="content">
                    <h4 class="font-weight-bold">{{ post.title }}</h4>
                    <p>{{ post.preview }}...<a href="javascript:;" routerLink="/post/{{post.post_id}}">ReadMore</a></p>
                    <p class="border-top p-t">Date: <span class="m-r-3">{{post.created_at}}</span>Author: <span>{{post.author}}</span></p>
                </li>
            </ul>
        </div>
        <div class="col-sm-3 col-lg-3">
            <div class="side">
                <div class="bg-primary font-weight-bold p-2 mb-2">最近更新</div>
                <div class="p-1" *ngFor="let post of postList; let i =  index;"><a href="javascript:;">{{i+1}} {{ post.title }}</a></div>
            </div>
            <div class="side">
                <div class="bg-primary font-weight-bold p-2 mb-2">热门文章</div>
                <div class="p-1" *ngFor="let post of postList; let i =  index;"><a href="javascript:;">{{i+1}} {{ post.title }}</a></div>
            </div>
        </div>
    </div>
    `
})
export class PostListComponent implements OnInit {
    postList;
    constructor(private postService: PostService){}
    ngOnInit() {
        this.postList = [
            {
                title: '卡布·加塔自然公园',
                cover: '',
                preview: '位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。',
                created_at: '2019-03-02',
                author: 'Jugg',
                post_id: '1234564564',
                overt: true
            },
            {
                title: '萨瑟兰瀑布和奎尔湖',
                cover: '',
                preview: '新西兰的萨瑟兰瀑布和奎尔湖 (© Michael Rathmayr/plainpicture)。',
                created_at: '2019-03-03',
                author: 'Troll',
                post_id: '7987987444',
                overt: true
            }
        ];
        // this.postService.get_posts().pipe(take(1)).subscribe();
    }
}
