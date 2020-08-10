import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
	selector: '[popup]',
	templateUrl: './popup.component.html'
})

export class PopupComponent {
	
	@Input() message: string;
	@Input() type: string;
	@Output() closed: EventEmitter<string>;
	constructor() {
		this.closed = new EventEmitter();
	}
	clicked() {
		this.closed.emit('close');
	}
}