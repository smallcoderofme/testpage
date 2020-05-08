import { Component, OnInit } from '@angular/core';
import { Post, Tag, PostComment } from '../type.struct';
import { MockServerSupport } from '../mock.server.support';

const EMAIL_REG: RegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

@Component({
    styleUrls: ['./post.list.component.css'],
    template: `
        <div class="row">
            <div class="col-sm-9 col-lg-9">
                <div class="content">
                    <h3 class="text-center font-weight-bold border-bottom pb-2">{{postDetail.title}}</h3>
                    <div class="border-bottom pb-2"><i><small>版权声明：本文为博主原创文章，遵循 <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener"> CC 4.0 BY-SA </a> 版权协议，转载请附上原文出处链接和本声明。</small></i></div>
                    <p>{{postDetail.content}}</p>
                    <div class="text-right mt-2 border-top pt-2"><span class="info">Post by {{postDetail.author}} at {{postDetail.created_at}}</span></div>
                </div>
            </div>
            <div class="col-sm-3 col-lg-3">
                <div class="side">
                    <div class="bg-primary font-weight-bold p-2 mb-2">相关推荐</div>
                    <div class="p-1" *ngFor="let post of postList; let i =  index;"><a href="javascript:;">{{i+1}} {{ post.title }}</a></div>
                </div>
                <div class="side">
                    <div class="bg-primary font-weight-bold p-2 mb-2">标签</div>
                    <div class="p-1">
                        <a href="javascript:;" *ngFor="let tag of tagList" class="badge badge-success p-1 mr-3">{{ tag.name }}</a>
                    </div>
                </div>
            </div>
            <div class="col-sm-9 col-lg-9">
                <form class="side">
                    <div class="form-group row">
                        <label for="comment" class="col-sm-3 col-form-label col-form-label-sm">Comment: *</label>
                        <div class="col-sm-9">
                            <textarea type="email" id="comment" class="form-control form-control-sm"
                            [(ngModel)]="commentModel.content"
                            [ngModelOptions]="{standalone: true}"
                            [ngClass]="{'is-invalid': status.isInvalid_content}"
                            placeholder="请输入您的评论" required></textarea>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="username" class="col-sm-3 col-form-label col-form-label-sm">User Name: *</label>
                        <div class="col-sm-9">
                            <input type="text" id="username" class="form-control form-control-sm"
                            [(ngModel)]="commentModel.username"
                            [ngModelOptions]="{standalone: true}"
                            [ngClass]="{'is-invalid': status.isInvalid_username}" required>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="email" class="col-sm-3 col-form-label col-form-label-sm">Email: *</label>
                        <div class="col-sm-9">
                            <input type="email" id="email" class="form-control form-control-sm"
                            [(ngModel)]="commentModel.email"
                            class="form-control form-control-sm"
                            [ngModelOptions]="{standalone: true}"
                            [ngClass]="{'is-invalid': status.isInvalid_email}" required>
                        </div>
                    </div>
                    <input type="submit" class="btn btn-success btn-sm mb-2 mt-1" value="Submit" (click)="submitComment()">
                </form>
            </div>
            <div class="col-sm-9 col-lg-9">
                <div class="side border-top">
                    <div *ngFor="let comment of commentList; let i =  index;" class="border-bottom pb-1 mb-2">
                        <span class="text-muted">#{{i+1}}</span><span class="font-weight-bold"> {{ comment.username }}</span><span class="mr-3 font-weight-bold">:</span>
                        <span>{{ comment.content }}</span>
                        <p class="text-right comment-p">Date:{{ comment.createAt }}</p>
                    </div>
                <div>
            </div>
        </div>
    `
})

export class PostDetailComponent implements OnInit {
    postDetail;
    postList: Post[];
    tagList: Tag[];
    commentModel: PostComment;
    status = {
        isInvalid_content: false,
        isInvalid_email: false,
        isInvalid_username: false
    };

    commentList: PostComment[];

    constructor(private mockHttp: MockServerSupport){
        this.commentModel = {
            username: '',
            content: '',
            email: '',
            createAt: ''
        };
        this.commentList = [{
            username: 'Juggernaut',
            content: 'Hey guy!',
            email: 'jugg@gmail.com',
            createAt: '2020-02-02'
        }, {
            username: 'Troll',
            content: 'For routing guards with such control authority, if there is no authority to enter a route, where to automatically jump to a route address.',
            email: 'jugg@gmail.com',
            createAt: '2020-02-04'
        }];
    }
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
        this.mockHttp.getPosts().subscribe(next => {
            this.postList = next;
        });
        this.mockHttp.getTags().subscribe(next => {
            this.tagList = next;
        });
    }

    submitComment() {
        if (this.commentModel.email.replace(/ /g, '').length === 0 || 
            !EMAIL_REG.test(this.commentModel.email)) {
            this.status.isInvalid_email = true;
            return;
        }
        if (this.commentModel.username.replace(/ /g, '').length === 0 ||
            this.commentModel.username.indexOf('.js') !== -1 ||
            this.commentModel.username.indexOf('iframe') !== -1) {
            this.status.isInvalid_username = true;
            return;
        }
        if (this.commentModel.content.replace(/ /g, '').length === 0 ||
            this.commentModel.content.indexOf('.js') !== -1 ||
            this.commentModel.content.indexOf('iframe') !== -1) {
            this.status.isInvalid_content = true;
            return;
        }
        console.log(this.commentModel);
    }
}
