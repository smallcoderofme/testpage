import { Component, Input } from '@angular/core';
import { WaterFull } from '../type.struct';

@Component({
  selector: 'app-waterfull',
  styleUrls: ['./waterfull.component.css'],
  template: `
	  <img src="{{wf.img}}"/>
	  <p> {{wf.content}} </p>
  `
})
export class WaterfullComponent {

	@Input() wf: WaterFull;
	constructor() {}
}
