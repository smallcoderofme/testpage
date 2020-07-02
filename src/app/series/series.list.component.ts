import { Component, OnInit, OnDestroy } from '@angular/core';
import { Series } from '../type.struct';
import { MockServerSupport } from '../mock.server.support';
import { Subscription } from 'rxjs';

@Component({
    styleUrls: ['./series.component.css'],
    templateUrl: './series.list.component.html'
})

export class SeriesListComponent implements OnInit, OnDestroy {
    series: Series[];
    currSeries: Series;

    demoDetail: any;

    private subscription: Subscription;
    constructor( private mockServer: MockServerSupport ) {
        this.subscription = new Subscription();
    }
    ngOnInit() {
        const observe = this.mockServer.getSeries();
        const sub1 = observe.subscribe(data => {
            this.series = data;
            this.currSeries = data[0];
        }, error => {}, () => {
            console.log('Get series complete!');
        });
        this.subscription.add(sub1);

        this.demoDetail = this.getDetail();
    }
    selectedSeries(selected: Series) {
        for (const series of this.series) {
            if (series.id === selected.id) {
                selected.open = !selected.open;
                continue;
            }
            series.open = false;
        }
    }

    getDetail() {
        return {
            name: 'Vi Editor',
            content: `如果不是在云服务器上配置文件要用它，我是不太可能主动去学习这种上古时期的编辑器的，纵使其功能强大。
                顺便提一下:在FreeBSD上还自带了一个ee编辑器，号称容易上手。编辑器快捷键会显示在编辑器上面，对新手友好。但我第一次用的时候也很不顺，没办法，习惯图形界面了。
                已经没办法了，开始看下vim的使用。下面是记录的最基本的使用，能满足日常配置文件需要。</p>
                打开vi后默认的模式是命令行模式， 按a或者i可以进入输入模式，Esc退出到命令行模式，命令行模式下x是删除，:wq是保存退出，q是退出，w是保存。！是忽略`,
            created_at: '2020-3-23',
            author: 'Abadon'
        };
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
