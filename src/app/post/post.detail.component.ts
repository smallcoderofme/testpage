import { Component, OnInit } from '@angular/core';

@Component({
    styleUrls: ['./post.list.component.css'],
    template: `
        <div class="row">
            <div class="col-sm-9 col-lg-9">
                <div class="content">
                    <h4 class="text-center">{{postDetail.title}}</h4>
                    <p>{{postDetail.content}}</p>
                </div>
            </div>
        </div>
    `
})
export class PostDetailComponent implements OnInit {
    postDetail;
    constructor(){}
    ngOnInit(){
        this.postDetail = {
            title: '卡布·加塔自然公园',
            cover: '',
            content: '位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。',
            created_at: '2019-03-02',
            author: 'Jugg',
            post_id: '1234564564',
            overt: true
        };
    }
}