import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { PopupType } from '../type.struct';

@Component({
	selector: 'app-popup',
	templateUrl: './popup.component.html'
})

export class PopupComponent {
	_message: string;
	_type: string;

	@Input()
	set message(message: string) {
		this._message = message;
	}

	@Input()
	set type(type: string) {
		this._type = type;
	}

  	get type(): string { return this._type; }

  	get message(): string { return this._message; }

	@Output() closed: EventEmitter<string>;
	constructor() {
		this.closed = new EventEmitter();
	}
	clicked() {
		this.closed.emit('close');
	}
}