import { Component, OnInit } from '@angular/core';
import { Post, Tag } from '../type.struct';
import { PostService } from './post.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalConfig } from '../GlobalConfig';
import { TagsService } from '../authorize/tags.service';
import { ViewportScroller } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';


const EMAIL_REG: RegExp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;

@Component({
    styleUrls: ['./post.list.component.css'],
    providers: [ GlobalConfig ],
    templateUrl: './post.detail.component.html'
})

export class PostDetailComponent implements OnInit {
    myCommentForm: FormGroup;
    replyTo: AbstractControl;
    email: AbstractControl;
    comment: AbstractControl;
    username: AbstractControl;
    postDetail: Post;
    postList: Post[];
    tagList: Tag[];
    // commentModel = { username: '', email: '', content: '', reply: undefined};
    // status = {
    //     isInvalid_content: false,
    //     isInvalid_email: false,
    //     isInvalid_username: false
    // };
    commentList: any[];
    constructor(
      private fb: FormBuilder,
      public global: GlobalConfig,
      private viewportScroller: ViewportScroller,
      private tagService: TagsService,
      private postService: PostService,
      private route: ActivatedRoute){

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

        this.myCommentForm = this.fb.group({
          replyTo : new FormControl({value: '', disabled: true}),
          comment: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(512)]),
          username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(32)]),
          email: new FormControl('', [Validators.email, Validators.required])
        }, { updateOn: 'submit'});

        this.replyTo = this.myCommentForm.controls.replyTo;
        this.comment = this.myCommentForm.controls.comment;
        this.username = this.myCommentForm.controls.username;
        this.email = this.myCommentForm.controls.email;
    }
    ngOnInit(): void {
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
      /**
       * 相关推荐
       */
      // this.postService
    }
    onClickTag(id: string): void {
      // console.log('---------------------------------- id:', id);
      this.postService.getPostsByLabel(id).subscribe(res => {

      }, err => {

      }, () => {

      });
    }
    replyComment(reply: string): void {
    //   this.commentModel.reply = replyTo;
      this.myCommentForm.setValue({ replyTo: reply });
      this.viewportScroller.scrollToAnchor('commentForm');
    }

    closeReply(): void {
    //   this.commentModel.reply = null;
      this.myCommentForm.setValue({ replyTo: null });
    }

    onSubmit(): void {
      console.log(this.username.valid, this.comment.valid, this.email.valid);
      if (this.username.valid &&
          this.comment.valid &&
          this.email.valid) {
          console.log('llllllllllllllog correct');
          // const id: string = this.route.snapshot.paramMap.get('id');
          // this.postService.submit_comment(id, {
          //   username: this.myCommentForm.get('username').value,
          //   email: this.myCommentForm.get('email').value,
          //   content: this.myCommentForm.get('comment').value,
          //   reply: this.myCommentForm.get('replyTo').value
          // }).subscribe(next => {
          //   this.commentList = next.comments;
          // }, error1 => {
    
          // }, () => {
    
          // });
      }
    }
}
