import { Directive, HostListener, HostBinding, ElementRef } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})

export class DropdownDirective {
    private isOpen: boolean;
    constructor(private _el: ElementRef) { 
        this.isOpen = false;
    }
    
    @HostBinding('class.show') get opened() {
        return this.isOpen;
    }
    @HostListener('click') open() {
        this.isOpen = !this.isOpen;
        
        if (!this.isOpen) {
            this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
        } else {
            this._el.nativeElement.querySelector('.dropdown-menu').classList.add('show');
        }               
    }
    @HostListener('document:click', ['$event.target']) close (targetElement) {
        const inside: boolean = this._el.nativeElement.contains(targetElement);
        if (!inside) {
            this.isOpen = false;
            this._el.nativeElement.querySelector('.dropdown-menu').classList.remove('show');
        }
    }
}
