import { Component, OnInit } from '@angular/core';
import { UserService } from '../greeting/user.service';
import { Router } from '@angular/router';
import { MockServerSupport } from '../mock.server.support';
import { Post, Tag, Series } from '../type.struct';

enum TOPIC {
    TAG = 1,
    POST = 2,
    SERIES = 3
}

class Topic {
    status = false;
    currTopic = 1;
}

@Component({
    selector: 'app-authorize',
    styleUrls: ['./authorize.component.css'],
    templateUrl: './authorize.component.html'
})

export class AuthorizeComponent implements OnInit {
    readonly STATIC_TOPIC = TOPIC;
    topic: Topic;
    postList: Post[];
    tagList: Tag[];
    series: Series[];
    tagName: string;
    constructor(private userService: UserService, private router: Router, private mockServer: MockServerSupport) {}
    ngOnInit() {
        this.tagName = '';
        const verifyCookie = this.userService.verifyCookie();
        console.log('AuthorizeComponent: ', verifyCookie);
        if ( !verifyCookie ) {
            this.router.navigateByUrl('/auth/login');
        }
        this.topic = { status: true, currTopic: TOPIC.TAG };
        if (!this.tagList) {
            this.topic.status = false;
            this.mockServer.getTags().subscribe(next => {
                this.tagList = next;
            }, complete => {
                this.topic.status = true;
            });
        }
    }
    onClick(post: Post, evt: Event) {

    }
    customSwitch(index: number) {

    }

    onChangeTopic(topicId: number) {
        switch (topicId) {
            case this.STATIC_TOPIC.POST:
                if (!this.postList) {
                    this.topic.status = false;
                    this.mockServer.getPosts().subscribe(next => {
                        this.postList = next;
                    }, complete => {
                        this.topic.status = true;
                    });
                }
                break;
            case this.STATIC_TOPIC.SERIES:
                if (!this.series) {
                    this.topic.status = false;
                    this.mockServer.getSeries().subscribe(data => {
                        this.series = data;
                    }, complete => {
                        console.log('Get series complete!');
                    });
                }
                break;
        }
        this.topic.currTopic = topicId;
    }
    addNewTag() {
        this.tagList.push({name: this.tagName, tag_id: (9999999 * Math.random()).toString()});
        this.tagName = '';
    }
    removeTag(tagId: string) {
        const len: number = this.tagList.length;
        for (let index = 0; index < len; index++) {
            const tag = this.tagList[index];
            if ( tag.tag_id === tagId ) {
                this.tagList.splice(index, 1);
            }
        }
    }
}
