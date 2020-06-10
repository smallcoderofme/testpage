import { Component, OnInit } from '@angular/core';
import { MockServerSupport } from '../mock.server.support';
import { Post, Tag, Series } from '../type.struct';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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

    // createNewSeries: BsModalRef;

    constructor( private mockServer: MockServerSupport) {}//, private modalService: BsModalService
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


    newSeries() {
        // const initialState = {
        //     series: {
        //         name: '',
        //         publish: true
        //     },
        //     title: 'Create New'
        //   };
        // this.createNewSeries = this.modalService.show(ModalContentComponent, {initialState});
        // this.createNewSeries.content.closeBtnName = 'Close';
    }
}

// @Component({
//     selector: 'app-modal-content',
//     template: `
//         <div class="modal-header">
//             <h4 class="modal-title pull-left">{{title}}</h4>
//                 <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
//                     <span aria-hidden="true">&times;</span>
//                 </button>
//             </div>
//             <div class="modal-body">
//                 <form>
//                     <div class="form-group">
//                         <label for="seriesName" class="pull-left col-form-label">Name</label>
//                         <input type="text" [(ngModel)]="series.name" name="name" id="seriesName" class="form-control" required>
//                     </div>
//                 </form>
//             </div>
//             <div class="modal-footer">
//             <button type="button" class="btn btn-outline-primary" (click)="bsModalRef.hide()">Confirm</button>
//             <button type="button" class="btn btn-outline-dark" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
//         </div>
//     `
// })
// export class ModalContentComponent implements OnInit {
//     title: string;
//     closeBtnName: string;
//     series = {
//         name: '',
//         publish: true
//     };
//
//     constructor(public bsModalRef: BsModalRef) {}
//
//     ngOnInit() {
//         this.series.name = 'hello';
//     }
// }
