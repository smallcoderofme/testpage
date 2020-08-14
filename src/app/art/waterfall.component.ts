import { Component, Input } from '@angular/core';
import { WaterFall } from '../type.struct';

@Component({
  selector: 'app-waterfull',
  styleUrls: ['./waterfall.component.css'],
  template: `
	  <img src="{{wf.img}}"/>
	  <p> {{wf.content}} </p>
  `
})
export class WaterfallComponent {

	@Input() wf: WaterFall;
	constructor() {}
}
