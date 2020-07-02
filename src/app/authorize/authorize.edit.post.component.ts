import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post/post.service';

@Component({
    template: `
    <div class="row">
        <div class="col-sm-10 mt-3">
            <input type="text" class="form-control mb-2"
            [(ngModel)]="post.title"
            [ngModelOptions]="{standalone: true}">
            <ckeditor [editor]="Editor" [config]="config" data="<p>Hello, world!</p>" (change)="onChange($event)"></ckeditor>
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
        <button class="btn btn-primary btn-sm" (click)="updatePost()">Submit</button>
        </div>
    </div>`,
    styleUrls: ['./authorize.component.css']
})

export class AuthorizeEditPostComponent implements OnInit {
    constructor(private route: ActivatedRoute, private postService: PostService){}

    post = { disable: false, title: '', content: '', public: false };
    ngOnInit() {
        const postId: string = this.route.snapshot.paramMap.get('post_id');
        this.postService.get_post_by_id(postId).subscribe(res => {
            console.log('Selected post: ', res);
            this.post.title = res.title;
            this.post.content = res.content;
            this.post.public = res.public;
        }, complete => {
            console.log('Selected post complete!', complete);
        });
    }
    onClick(evt) {
        this.post.public = !this.post.public;
    }
    updatePost() {

    }
}
