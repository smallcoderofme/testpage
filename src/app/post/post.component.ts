import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { Post } from '../type.struct';
import { GlobalConfig } from '../GlobalConfig';

@Component({
	selector: 'app-post',
	providers: [GlobalConfig],
	styleUrls: [],
	template: `<div class="border-bottom pb-2">
                    <span class="h3 font-weight-bold ">{{post.name}}</span>
                  	<span class="badge badge-secondary ml-4" *ngFor="let label of post.labels">{{label.name}}</span>
                </div>
                <img *ngIf="post.avatar" src="{{post.avatar}}" class="img-fluid">
                <p>{{ post.preview }}...<a href="javascript:;" routerLink="/post/list/{{post._id}}">ReadMore</a></p>
                <p class="border-top p-t">Date: <span class="m-r-3">{{post.createdAt | date: global.POST_DATE_FORMAT}}</span>
                	Author: <span>{{post.author}}</span>
            	</p>`
})

export class PostComponent implements OnInit {

	@Input() post: Post;
	// @HostBinding('attr.class') cssClass = 'test';
	
	constructor(public global: GlobalConfig) {
		// code...
	}
	ngOnInit(): void {

	}
}