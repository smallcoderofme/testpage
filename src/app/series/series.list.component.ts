import { Component, OnInit, OnDestroy } from '@angular/core';
import { Series } from '../type.struct';
import { MockServerSupport } from '../mock.server.support';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './series.list.component.html'
})

export class SeriesListComponent implements OnInit, OnDestroy {
    series: Series[];
    currSeries: Series;
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

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
