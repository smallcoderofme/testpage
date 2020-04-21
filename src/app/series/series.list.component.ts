import { Component, OnInit } from '@angular/core';
import { Series } from '../type.struct';
import { MockServerSupport } from '../mock.server.support';
import { reduce } from 'rxjs/operators';

@Component({
    templateUrl: './series.list.component.html'
})

export class SeriesListComponent implements OnInit {
    series: Series[];
    constructor( private mockServer: MockServerSupport) {}
    ngOnInit() {
        this.mockServer.getSeries().subscribe(data => {
            this.series = data;
        }, complete => {
            console.log('Get series complete!');
        });
    }
    selectedSeries(id: string) {
        for (const series of this.series) {
            if ( id === series.id ) {
                series.open = true;
            } else {
                series.open = false;
            }
        }
    }
}
