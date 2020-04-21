import { Component, OnInit } from '@angular/core';
import { Series } from '../type.struct';
import { MockServerSupport } from '../mock.server.support';

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
}
