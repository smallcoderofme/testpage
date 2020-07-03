import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post/post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapterPlugin } from '../my-upload-adapter';

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
        <button class="btn btn-primary btn-sm" (click)="updatePost()">Submit</button>
        </div>
    </div>`,
    styleUrls: ['./authorize.component.css']
})

export class AuthorizeEditPostComponent implements OnInit {
    config;
    public post = { title: '', content: '', publish: true, disable: false };
    public Editor = ClassicEditor;
    constructor(private route: ActivatedRoute, private postService: PostService){
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
            console.log('Selected post: ', res);
            this.post.title = res.name;
            this.post.content = res.content;
            this.post.publish = res.publish;
        }, complete => {
            console.log('Selected post complete!', complete);
        });
    }
    onClick(evt) {
        this.post.publish = !this.post.publish;
    }
    updatePost() {

    }
    private uploadContent() {}
}
