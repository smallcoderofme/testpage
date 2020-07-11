import { Component, OnInit } from '@angular/core';
import { Post, Tag } from '../type.struct';
import { PostService } from './post.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConfig } from '../GlobalConfig';
import { TagsService } from '../authorize/tags.service';
import { ViewportScroller } from '@angular/common';

const EMAIL_REG: RegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

@Component({
    styleUrls: ['./post.list.component.css'],
    providers: [ GlobalConfig ],
    templateUrl: './post.detail.component.html'
})

export class PostDetailComponent implements OnInit {
    postDetail: Post;
    postList: Post[];
    tagList: Tag[];
    commentModel = { username: '', email: '', content: '', reply: null};
    status = {
        isInvalid_content: false,
        isInvalid_email: false,
        isInvalid_username: false
    };
    commentList: any[];
    constructor(public global: GlobalConfig, private viewportScroller: ViewportScroller, private tagService: TagsService, private postService: PostService, private route: ActivatedRoute){

        this.commentList = [{
            username: 'Juggernaut',
            content: 'Hey guy!',
            email: 'jugg@gmail.com',
            createdAt: '2020-02-02'
        }, {
            username: 'Troll',
            content: 'For routing guards with such control authority, if there is no authority to enter a route, where to automatically jump to a route address.',
            email: 'jugg@gmail.com',
            createdAt: '2020-02-04'
        }];
    }
    ngOnInit(){
        this.postDetail = {
            name: '卡布·加塔自然公园',
            avatar: '',
            preview: '',
            content: '位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。',
            createdAt: '2019-03-02',
            author: 'Jugg',
            _id: '1234564564',
            publish: true
        };
        const id: string = this.route.snapshot.paramMap.get('id');
        this.postService.get_post_by_id(id).subscribe(res => {
            const reg = new RegExp('<img', 'g');
            res.data.content = res.data.content.replace(reg, '<img class = "img-fluid"');
            this.postDetail = res.data;
            this.commentList = res.data.comments;
        }, error => {

        }, () => {

        });

        this.tagService.get_tags().subscribe(res => {
          this.tagList = res.list;
        }, error1 => {

        }, () => {

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
        const id: string = this.route.snapshot.paramMap.get('id');
        this.postService.submit_comment(id, this.commentModel).subscribe(next => {
          this.commentList = next.comments;
        }, error1 => {

        }, () => {

        });
    }

    replyComment(replyTo: string) {
      console.log('will to comment to username: ', replyTo);
      this.commentModel.reply = replyTo;
      this.viewportScroller.scrollToAnchor('commentForm');
    }

    closeReply() {
      this.commentModel.reply = null;
    }
}
