import { Component, OnInit } from '@angular/core';
import { WaterFall } from '../type.struct';
@Component({
  selector: 'app-art',
  styleUrls: [],
  templateUrl: './art.component.html'
})

export class ArtComponent implements OnInit {
	waterfallList: Array<WaterFall>;
	constructor() {}

	ngOnInit(): void {
		this.waterfallList = [
			{ img: 'http://dummyimage.com/480x4:3', content: '1 convallis timestamp' },
			{ img: 'http://dummyimage.com/300x4:3', content: '2 convallis timestamp' },
			{ img: 'http://dummyimage.com/640x16:9', content: '3 convallis timestamp' },
			{ img: 'http://dummyimage.com/480x4:3', content: '4 convallis timestamp' }
		];
	}
}
