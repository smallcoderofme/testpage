import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, ComponentRef, Component } from '@angular/core';
import { PopupComponent } from './popup.component';
import { PopupType } from '../type.struct';

@Injectable()
export class PopupService {
	
	popup: HTMLElement;
	popupComponentRef: ComponentRef<PopupComponent>;
	constructor(private injector: Injector,
				private applicationRef: ApplicationRef,
				private componentFactoryResolver: ComponentFactoryResolver) {}

	show(message: string, type: PopupType) {
		this.popup = document.createElement('popup-component');
		this.popupComponentRef = this.componentFactoryResolver
									.resolveComponentFactory(PopupComponent)
									.create(this.injector, [], this.popup);

		this.applicationRef.attachView(this.popupComponentRef.hostView);
		this.popupComponentRef.instance.closed.subscribe(() => {
			document.body.removeChild(this.popup);
			this.applicationRef.detachView(this.popupComponentRef.hostView);
		});
		console.log("type", type);
		this.popupComponentRef.instance.type = type;
		this.popupComponentRef.instance.message = message;
		document.body.appendChild(this.popup);
		setTimeout( () => {
			if (this.popup.parentNode) {
				this.hide();
			}
		}, 2000);
	}
	hide() {
	    document.body.removeChild(this.popup);
    	this.applicationRef.detachView(this.popupComponentRef.hostView);
	}
}