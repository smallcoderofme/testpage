import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapterPlugin } from '../my-upload-adapter';
import { PostService } from '../post/post.service';
import { Post, Tag } from '../type.struct';
import { TagsService } from './tags.service';


@Component({
    styleUrls: ['./authorize.component.css'],
    template: `
        <div class="row">
            <div class="col-sm-9 col-xl-9 mt-3">
                <input type="text" class="form-control mb-2"
                [(ngModel)]="post.title"
                [ngModelOptions]="{standalone: true}">
                <ckeditor [editor]="Editor" [(ngModel)]="post.content" [config]="config" data="<p>Hello, world!</p>"></ckeditor>
            </div>
            <div class="col-sm-3 col-xl-3">
              <div class="side">
                <div class="bg-primary font-weight-bold p-2 mb-2">所有标签</div>
                <div class="p-1">
                  <a href="javascript:;" *ngFor="let tag of tags" class="badge badge-success p-1 mr-3" (click)="selecting(tag._id)">{{ tag.name }}</a>
                </div>
              </div>
              <div class="side">
                <div class="bg-primary font-weight-bold p-2 mb-2">已选标签</div>
                <div class="p-1">
                  <span *ngFor="let tag of selected" class="badge badge-success p-2 mr-3">{{ tag.name }}
                    <a href="javascript:;"><i class="pull-right point-cursor text-warning" (click)="unselecting(tag._id);">x</i></a>
                  </span>
                </div>
              </div>
            </div>
            <div class="col-sm-9 col-xl-9 mt-3">
              publish:
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
              <button class="btn btn-outline-primary btn-sm" (click)="createPost()">Submit</button>
            </div>
        </div>
    `
})
export class AuthorizeCreatePostComponent implements OnInit {
    public Editor = ClassicEditor;
    public config;
    public post = { title: '', content: '', publish: true, disable: false };
    public tags: Tag[];
    public selected: Tag[] = [];
    constructor(private postService: PostService, private tagsService: TagsService) {}
    ngOnInit() {
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
      this.tagsService.get_tags_by_userId().subscribe(next => {
        this.tags = next.list;
      }, error => {}, () => {});
    }

    private uploadContent() {}

    public onClick(evt) {
    }

    public createPost() {
        const review: string = this.post.content.substr(0, 256).replace(/<.*?>/g, '').replace(/&nbsp;/g, '')  + '... ...';
        const avatar = this.post.content.match('(src)=(\")(.*?)(\")');
        // console.log(avar);
        // const reg = new RegExp('<img', 'g');
        // const detail = this.post.content.replace(reg, '<img class = "img-fluid rounded img-thumbnail"');
        const cover = avatar ? avatar[3] : '';
        const labs: string[] = this.selected.map((label) => { return label.name; });
        const paramData: Post = {
            name: this.post.title,
            content: this.post.content,
            publish: this.post.publish,
            labels: labs,
            preview: review,
            avatar: cover
        };
        // console.log( paramData );
        this.postService.create_post(paramData).subscribe(res => {
          // console.log('success: ', res);
          this.resetPostModel();
        }, error => {
          console.log('failed: ', error);
        }, () => {
          console.log('complete! ');
        });
    }
    selecting(id: string) {
      for (const tag of this.tags) {
        if ( id === tag._id ) {
          this.selected.push(this.tags.splice(this.tags.indexOf(tag), 1)[0]);
          break;
        }
      }
    }
    unselecting( id: string) {
      for (const tag of this.selected) {
        if ( id === tag._id ) {
          this.tags.push(this.selected.splice(this.selected.indexOf(tag), 1)[0]);
          break;
        }
      }
    }
    resetPostModel() {
      this.post.title = '';
      this.post.content = '';
      this.post.publish = true;
      this.post.disable = false;
    }
}
