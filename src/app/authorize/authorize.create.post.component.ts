import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapterPlugin } from '../my-upload-adapter';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Post } from '../type.struct';

@Component({
    styleUrls: ['./authorize.component.css'],
    template: `
        <div class="row">
            <div class="col-sm-10 mt-3">
                <ckeditor [editor]="Editor" [config]="config" data="<p>Hello, world!</p>" (change)="onChange($event)"></ckeditor>
            </div>
            <div class="col-sm-10 mt-3">
              public:
              <div class="custom-control custom-switch mt-1 mb-2">
                <input type="checkbox"
                       [(ngModel)]="post.overt"
                       [ngModelOptions]="{standalone: true}"
                       [disabled]="post.disable"
                       (click)="onClick(post, $event);"
                       (change)="onClick(post, $event);"
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
    public post = { overt: false, disable: false };
    constructor() {
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
    public onChange( { editor }: ChangeEvent ) {
        const data = editor.getData();
        console.log( data );
    }
    private uploadContent() {}

    public onClick(post, evt) {
    }

    public createPost() {
      const p: Post = {
        title: '',
        cover: '',
        preview: '',
        created_on: '',
        updated_on: '',
        author: '',
        post_id: '',
        public: this.post.overt
      };
    }
}
