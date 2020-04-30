import { Component, OnInit } from '@angular/core';
import { Series } from '../type.struct';
import { MockServerSupport } from '../mock.server.support';

@Component({
    templateUrl: './series.list.component.html'
})

export class SeriesListComponent implements OnInit {
    series: Series[];
    currSeries: Series;
    constructor( private mockServer: MockServerSupport) {}
    ngOnInit() {
        this.mockServer.getSeries().subscribe(data => {
            this.series = data;
            this.currSeries = data[0];
        }, complete => {
            console.log('Get series complete!');
        });
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
}
