import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post/post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapterPlugin } from '../my-upload-adapter';
import { Post } from '../type.struct';

@Component({
    template: `
    <div class="row">
        <div class="col-sm-10 mt-3">
          <input type="text" class="form-control mb-2"
                 [(ngModel)]="post.title"
                 [ngModelOptions]="{standalone: true}">
          <ckeditor [editor]="Editor" [(ngModel)]="post.content" [config]="config" data="<p>Hello, world!</p>"></ckeditor>
        </div>
        <div class="col-sm-10 mt-3">
        public:
        <div class="custom-control custom-switch mt-1 mb-2">
          <input type="checkbox"
                 [(ngModel)]="post.publish"
                 [ngModelOptions]="{standalone: true}"
                 [disabled]="post.disable"
                 (click)="onClick($event);"
                 (change)="onClick($event);"
                 class="custom-control-input" id="publicSwitch">
          <label class="custom-control-label" for="publicSwitch"></label>
        </div>
        <button class="btn btn-outline-primary btn-sm" (click)="updatePost()">Submit</button>
        </div>
    </div>`,
    styleUrls: ['./authorize.component.css']
})

export class AuthorizeEditPostComponent implements OnInit {
    config;
    public post = { title: '', content: '', publish: true, disable: false, _id: '' };
    public Editor = ClassicEditor;
    constructor(private router: Router, private route: ActivatedRoute, private postService: PostService){
      this.config = {
        toolbar: {
          items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'indent',
            'outdent',
            '|',
            'imageUpload',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo',
            'CKFinder'
          ]
        },
        removePlugins: [ 'mediaEmbed' ],
        uploadContent: () => this.uploadContent(),
        extraPlugins: [ CustomUploadAdapterPlugin ],
        language: 'zh-cn',
        image: {
          toolbar: [
            'imageTextAlternative',
            'imageStyle:full',
            'imageStyle:side'
          ]
        },
        table: {
          contentToolbar: [
            'tableColumn',
            'tableRow',
            'mergeTableCells'
          ]
        },
        licenseKey: '',
      };
    }

    ngOnInit() {
        const postId: string = this.route.snapshot.paramMap.get('id');
        this.postService.get_post_by_id(postId).subscribe(res => {
            this.post.title = res.data.name;
            this.post.content = res.data.content;
            this.post.publish = res.data.publish;
            this.post._id = res.data._id;
        }, err => {
            console.log('Selected post error!', err);
        }, () => {
            console.log('Selected post complete!');
        });
    }
    onClick(evt) {
        this.post.publish = !this.post.publish;
    }
    updatePost() {
      const review = this.post.content.substr(0, 256).replace(/<.*?>/g, '').replace(/&nbsp;/g, '')  + '... ...';
      const avar = this.post.content.match('(src)=(\")(.*?)(\")');
      // console.log(avar);
      // const reg = new RegExp('<img', 'g');
      // const detail = this.post.content.replace(reg, '<img class = "img-fluid rounded img-thumbnail"');
      const cover = avar ? avar[3] : '';
      const paramData: Post = {
        name: this.post.title,
        content: this.post.content,
        publish: this.post.publish,
        preview: review,
        avatar: cover
      };
      this.postService.update_post(this.post._id, paramData).subscribe(next => {
        this.router.navigateByUrl('/auth/manage').then(() => {
          console.log('update and go to post page!');
        });
      }, err => {
        console.log(err);
      }, () => {
        console.log('update complete!');
      });
    }
    private uploadContent() {}
}
