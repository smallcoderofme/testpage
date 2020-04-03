import { Component, OnInit } from "@angular/core";

@Component({
    styleUrls: ['./post.list.component.css'],
    template: `
    <div class="row">
        <div class="col-sm-2 col-lg-2"></div>
        <div class="col-sm-8 col-lg-8">
            <ul>
                <li *ngFor="let post of postList">
                    <h4>{{ post.title }}</h4>
                    <p>{{ post.preview }}...<a href="javascript:;" routerLink="/post/{{post.post_id}}">ReadMore</a></p>
                    <p class="border-top p-t">Date: <span class="m-r-3">{{post.created_at}}</span>Author: <span>{{post.author}}</span></p>
                </li>
            </ul>
        <div>
        <div class="col-sm-2 col-lg-2"></div>
    </div>
    `
})
export class PostListComponent implements OnInit {
    postList;
    constructor(){}
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
    }
}