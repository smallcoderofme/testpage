import { Component, OnInit } from '@angular/core';
import { MockServerSupport } from '../mock.server.support';
import { Post, Tag, Series } from '../type.struct';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../post/post.service';

enum TOPIC {
    TAG = 1,
    POST = 2,
    SERIES = 3
}

interface Topic {
    status: boolean;
    currTopic: number;
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
    createModalTitle = 'Create New';
    currentSeries: Series;
    serie = {
        name: '',
        publish: true
    };

    constructor(private postService: PostService, private mockServer: MockServerSupport, config: NgbModalConfig, private modalService: NgbModal) {
        config.backdrop = 'static';
        config.keyboard = false;
    }
    ngOnInit() {
        this.tagName = '';
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

    editPost(postId: string) {
    }

    onChangeTopic(topicId: number) {
        switch (topicId) {
            case this.STATIC_TOPIC.POST:
                if (!this.postList) {
                    this.topic.status = false;
                    // this.mockServer.getPosts().subscribe(next => {
                    //     this.postList = next;
                    // }, complete => {
                    //     this.topic.status = true;
                    // });
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
    toggleSer(ser: Series) {
        ser.open = !ser.open;
        console.log(ser.name, ser.open);
    }
    saveNew() {
        console.log('------------- save', this.serie.name, this.serie.publish);
        if (this.createModalTitle === 'Create New') { // create

        } else { // edit
            this.currentSeries.name = this.serie.name;
            this.currentSeries.publish = this.serie.publish;
        }
        this.modalService.dismissAll();
        this.serie.name = '';
        this.serie.publish = true;
    }

    newSeries(content) {
        this.createModalTitle = 'Create New';
        this.modalService.open(content);
    }

    onClickChange(e) {
        console.log('change', e);
    }
    promot(deleteTpl) {
        this.modalService.open(deleteTpl);
    }
    confirmDelete() {}
    cancelDelete() {}
    editSeries(tpl, ser: Series) {
        this.createModalTitle = 'Edit Series';
        this.modalService.open(tpl);
        this.currentSeries = ser;
        this.serie.name = ser.name;
        this.serie.publish = ser.publish;
    }
}
