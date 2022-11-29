import { Directive, ElementRef, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appGame], [myModal], ',
  outputs: [
    "appGame",
    "myModal"
  ]
})

export class GameDirective {
  
  public appGame: ElementRef;

  constructor( private el: ElementRef ) { 
    this.appGame = el    
  }

  @HostListener('pointerdown') onMouseEnter($event: Event) {
    
    if (this.el.nativeElement.attributes.hasOwnProperty("appgame")) {
      this.hoverColor('solid 1px black');
    } 
  }

  @HostListener('pointerup') onMouseLeave() {
    this.hoverColor('');
  }

  @HostListener('click') onClick() {
  if (this.el.nativeElement.attributes.hasOwnProperty("mymodal")) {
    this.closeModal();
  }
  }

  private hoverColor( value: string) {
    this.el.nativeElement.style.border = value;
  }

  private closeModal() {
    this.el.nativeElement.style.display = "none";
  }
}
