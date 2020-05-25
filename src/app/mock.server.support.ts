import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Post, Series, Tag } from './type.struct';


const POST_LIST: Post[] = [
    {
        title: '卡布·加塔自然公园',
        cover: '',
        preview: '位于西班牙南部的卡布·加塔自然公园拥有神秘的湿地、浪漫的海滩、壮观的火山和令人赞叹的高山悬崖。走过柔软沙滩，在湛蓝的大海中尽情游泳，人生最大的享受莫过于此。',
        created_at: '2019-03-02',
        updated_at: '2019-03-03',
        author: 'Jugg',
        post_id: '1234564564',
        overt: true
    },
    {
        title: '萨瑟兰瀑布和奎尔湖',
        cover: '',
        preview: '新西兰的萨瑟兰瀑布和奎尔湖 (© Michael Rathmayr/plainpicture)。',
        created_at: '2019-03-03',
        updated_at: '2019-03-04',
        author: 'Troll',
        post_id: '7987987444',
        overt: true
    }
];
const SERIES_LIST: Series[] = [
    {
        name: 'blender',
        id: '1234567',
        list: [
            {
                name: 'blender models',
                id: 'b123121'
            }, {
                name: 'blender UV',
                id: 'b123122'
            }, {
                name: 'blender Texture',
                id: 'b123123'
            }],
        open: false
    },
    {
        name: 'godot',
        id: '1357911',
        list: [
            {
                name: 'godot import models',
                id: 'b123121'
            }, {
                name: 'godot startup',
                id: 'b123122'
            }, {
                name: 'godot for android',
                id: 'b123123'
            }],
        open: false
    },
    {
        name: 'nodejs',
        id: '246810',
        list: [
            {
                name: 'nodejs get start',
                id: 'b123121'
            }, {
                name: 'nodejs web development',
                id: 'b123122'
            }, {
                name: 'nodejs express framework',
                id: 'b123123'
            }],
        open: false
    },
    {
        name: 'angular',
        id: '235711',
        list: [
            {
                name: 'angular get start',
                id: 'b123121'
            }, {
                name: 'angularjs version 1.x',
                id: 'b123122'
            }, {
                name: 'Angular CLI',
                id: 'b123123'
            }],
        open: false
    },
    {
        name: 'egret',
        id: '1468910',
        list: [
            {
                name: 'egret for flash developer',
                id: 'b123121'
            }, {
                name: 'egret display list',
                id: 'b123122'
            }],
        open: false
    },
    {
        name: 'layabox',
        id: 'abcdefg',
        list: [
            {
                name: 'layabox 2d',
                id: 'b123121'
            }, {
                name: 'layabox 3d',
                id: 'b123122'
            }, {
                name: 'layabox difference between version 1.x and 2.x',
                id: 'b123123'
            }],
        open: false
    },
    {
        name: 'postgresql',
        id: 'sf73j0',
        list: [
            {
                name: 'SQL Language',
                id: 'b123121'
            }, {
                name: 'PL/Python',
                id: 'b123122'
            }, {
                name: 'Create database and Drop database',
                id: 'b123123'
            }],
        open: false
    }
];
const TAG_LIST = [
    {
        name: 'art',
        tag_id: 'sfdswe33r'
    },
    {
        name: 'life',
        tag_id: 'fdfth453'
    },
    {
        name: 'code',
        tag_id: '23423424'
    }
];

@Injectable({
    providedIn: 'root'
})
export class MockServerSupport {
    constructor(){}
    getPosts(): Observable<Post[]> {
        // tslint:disable-next-line: deprecation
        return Observable.create((observer: Observer<any>) => {
            observer.next(POST_LIST);
            observer.complete();
        });
    }
    getTags(): Observable<Tag[]> {
        // tslint:disable-next-line: deprecation
        return Observable.create( (observer: Observer<any>) => {
            observer.next(TAG_LIST);
            observer.complete();
        });
    }
    getSeries(): Observable<Series[]> {
        return new Observable( subscriber => {
            subscriber.next(SERIES_LIST);
            subscriber.complete();
        });
    }
    getSeriesDetail(id: string): Observable<any> {
        return new Observable();
    }
}
