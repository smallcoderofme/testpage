import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post/post.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CustomUploadAdapterPlugin } from '../my-upload-adapter';
import {Post, Tag} from '../type.struct';
import {TagsService} from './tags.service';

@Component({
    template: `
    <div class="row">
        <div class="col-sm-9 col-xl-9 mt-3">
          <input type="text" class="form-control mb-2"
                 [(ngModel)]="post.name"
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
        public:
        <div class="custom-control custom-switch mt-1 mb-2">
          <input type="checkbox"
                 [(ngModel)]="post.publish"
                 [ngModelOptions]="{standalone: true}"
                 [disabled]="post.disable"
                 (click)="onClick($event);"
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
    public post = { name: '', content: '', publish: true, disable: false, _id: '' };
    public Editor = ClassicEditor;
    public tags: Tag[];
    public selected: Tag[] = [];
    constructor(private tagsService: TagsService, private router: Router, private route: ActivatedRoute, private postService: PostService){
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
            this.post.name = res.data.name;
            this.post.content = res.data.content;
            this.post.publish = res.data.publish;
            this.post._id = res.data._id;
            this.selected = res.data.labels;
        }, err => {
        }, () => {
            this.tags = [];
            this.tagsService.get_tags_by_userId().subscribe(next => {
                for ( const t of next.list ) {
                    if (!this.exist(t._id)){
                        this.tags.push(t);
                    }
                }
            }, error => {},
                () => {}
            );
        });

    }

    exist(id: string) {
        for ( const tag of this.selected ) {
            if (tag._id === id) {
                return true;
            }
        }
        return false;
    }
    updatePost() {
      const review = this.post.content.substr(0, 256).replace(/<.*?>/g, '').replace(/&nbsp;/g, '')  + '... ...';
      const avar = this.post.content.match('(src)=(\")(.*?)(\")');
      // console.log(avar);
      // const reg = new RegExp('<img', 'g');
      // const detail = this.post.content.replace(reg, '<img class = "img-fluid rounded img-thumbnail"');
      const cover = avar ? avar[3] : '';
      const paramData: Post = {
        name: this.post.name,
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

    onClick(e: Event) {
      e.stopPropagation();
      e.preventDefault();
      this.post.disable = true;
      const req: boolean = !this.post.publish;
      this.postService.request_change_publish_status(this.post._id, req).subscribe(res => {
        this.post.publish = req;
      }, err => {
      }, () => {
        this.post.disable = false;
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
    private uploadContent() {}
}
