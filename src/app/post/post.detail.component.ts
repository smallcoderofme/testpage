import { Component, OnInit } from '@angular/core';

@Component({
    styleUrls: ['./post.list.component.css'],
    template: `
        <div class="row">
            <div class="col-sm-9 col-lg-9">
                <div class="content">
                    <h3 class="text-center font-weight-bold border-bottom pb-2">{{postDetail.title}}</h3>
                    <div class="border-bottom pb-2 pt-2"><i><small>版权声明：本文为博主原创文章，遵循 <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener"> CC 4.0 BY-SA </a> 版权协议，转载请附上原文出处链接和本声明。</small></i></div>
                    <p>{{postDetail.content}}</p>
                    <div class="text-right mt-2 border-top pt-2"><span class="info">Post by {{postDetail.author}} at {{postDetail.created_at}}</span></div>
                </div>
            </div>
            <div class="col-sm-3 col-lg-3">
                <div class="side">
                    <div class="bg-primary p-2 mb-2">相关推荐</div>
                    <div class="p-1" *ngFor="let post of postList; let i =  index;">{{i+1}} {{ post.title }}</div>
                </div>
            </div>
            <div class="col-sm-9 col-lg-9">
                <form class="light mb-3">
                    <div class="form-group">
                        <label for="comment" class="col-form-label col-form-label-sm">Comment:</label>
                        <textarea type="email" id="comment" class="form-control form-control-sm"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="username" class="col-form-label col-form-label-sm">User Name:</label>
                        <input type="text" id="username" class="form-control form-control-sm">
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-form-label col-form-label-sm">Email:</label>
                        <input type="email" id="email" class="form-control form-control-sm">
                    </div>
                    <input type="submit" class="btn btn-outline-primary btn-sm mb-2 mt-1" value="Submit">
                </form>
            </div>
        </div>
    `
})
export class PostDetailComponent implements OnInit {
    postDetail;
    postList: any[];
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
