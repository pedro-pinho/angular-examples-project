import { Directive, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appDecoratorsDirective]',
  standalone: true
})
export class DecoratorsDirectiveDirective implements OnInit {
  //@HostBinding decorator is used withing the custom directives to apply CSS style properties or DOM related tasks on the element
  @HostBinding('style.backgroundColor') backgroundColor?: string = '';
  @HostBinding('style.border') border: string = '1px solid white';
  @HostBinding('style.color') color: string = 'white';
  @HostBinding('style.fontWeight') fontWeight: string = 'bold';
  @HostBinding('style.padding') padding: string = '10px';
  @HostBinding('style.borderRadius') borderRadius: string = '5px';
  @HostListener('mouseenter') mouseEnter(): void {
    this.backgroundColor = 'lightgray';
  }
  @HostListener('mouseleave') mouseLeave(): void {
    this.backgroundColor = 'lightblue';
  }
  ngOnInit(): void {
    this.backgroundColor = 'lightgreen';
    this.border = '1px solid black';
  }

}
