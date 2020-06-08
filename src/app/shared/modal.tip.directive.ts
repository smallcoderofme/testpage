/* tslint:disable */
// Exact copy of contact/highlight.directive except for color and message
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[modal]'
})
/** Highlight the attached element or an InputElement in gray */
export class ModalTipDirective {
    private open: boolean = false;
    constructor(private el: ElementRef) {
        // el.nativeElement.style.backgroundColor = '#efeeed';
    }
    /** params: large medium small */
    @Input() modalTitle: string;
    @Input() modalTpl: string;

    @HostListener('click', ['$event.target']) onClick() {
        this.open = !this.open;
    }

    private toggle() {
        // if (this.modalTpl == null) {
        //     console.error('Required modal template param.');
        //     return;
        // }
        // const tilte: string = this.modalTitle || 'Tips';
        // if (this.open) {
        //     $(this.modalTpl).modal('show');
        // } else {
        //     $(this.modalTpl).modal('hide');
        // }
    }
}
