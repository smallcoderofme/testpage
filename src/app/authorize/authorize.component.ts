import { Component, OnInit } from '@angular/core';
import { UserService } from '../greeting/user.service';
import { Router } from '@angular/router';
import { MockServerSupport } from '../mock.server.support';
import { Post, Tag } from '../type.struct';

enum TOPIC {
    TAG = 1,
    POST = 2,
    DRAW = 3
};

class Topic {
    status: boolean = false;
    currTopic: number = 1;
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
    constructor(private userService: UserService, private router: Router, private mockServer: MockServerSupport) {}
    ngOnInit() {
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
            case this.STATIC_TOPIC.DRAW:
                break;
        }
        this.topic.currTopic = topicId;
    }
}
