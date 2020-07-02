import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapterPlugin } from '../my-upload-adapter';
// import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { PostService } from '../post/post.service';
import {Post} from '../type.struct';

@Component({
    styleUrls: ['./authorize.component.css'],
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
                       [(ngModel)]="post.overt"
                       [ngModelOptions]="{standalone: true}"
                       [disabled]="post.disable"
                       (click)="onClick($event);"
                       (change)="onClick($event);"
                       class="custom-control-input" id="publicSwitch">
                <label class="custom-control-label" for="publicSwitch"></label>
              </div>
              <button class="btn btn-primary btn-sm" (click)="createPost()">Submit</button>
            </div>
        </div>
    `
})
export class AuthorizeCreatePostComponent {
    public Editor = ClassicEditor;
    public config;
    public post = { title: '', content: '', overt: false, disable: false };
    constructor(private postService: PostService) {
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
    // public onChange( { editor }: ChangeEvent ) {
    //     this.post.content = editor.getData();
    //     // console.log( data );
    //
    // }
    private uploadContent() {}

    public onClick(evt) {
    }

    public createPost() {
        const review = this.post.content.substr(0, 256).replace(/<.*?>/g, '').replace(/&nbsp;/g, '')  + '... ...';
        const avar = this.post.content.match('(src)=(\")(.*?)(\")');
        // console.log(avar);
        // const reg = new RegExp('<img', 'g');
        // const detail = this.post.content.replace(reg, '<img class = "img-fluid rounded img-thumbnail"');
        const cover = avar ? avar[3] : '';
        const paramData: Post = {
            name: this.post.title,
            content: this.post.content,
            publish: this.post.overt,
            preview: review,
            avatar: cover
        };

        //   const p: Post = {
        //     title: '',
        //     cover: '',
        //     preview: '',
        //     created_on: '',
        //     updated_on: '',
        //     author: '',
        //     post_id: '',
        //     public: this.post.overt
        //   };

        console.log( paramData );
        this.postService.create_post(paramData).subscribe(res => {
          console.log('success: ', res);
        }, error => {
          console.log('failed: ', error);
        }, () => {
          console.log('complete! ');
        });
    }
}
