import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {  

  @HostBinding('class.open') isOpen = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  // for dropdown to close only on the button 
  @HostListener('click') toggle(event: Event){
    this.isOpen = !this.isOpen;
  }

  //for dropdown to close on click of anywhere in the document.
  // @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
  //   this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  // }
  
}
