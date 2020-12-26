import { Component, ElementRef, Input, Renderer2, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent {

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2) {
    this._variant = 'vertical-style-1';
  }

  _variant: string;

  get variant(): string {
    return this._variant;
  }

  @Input()
  set variant(value: string) {
    this.removeOldClassName();
    this.storeVariant(value);
    this.addNewClassName(value);
  }

  private removeOldClassName() {
    this._renderer.removeClass(this._elementRef.nativeElement, this.variant);
  }

  private storeVariant(value: string) {
    this._variant = value;
  }

  private addNewClassName(value: string) {
    this._renderer.addClass(this._elementRef.nativeElement, value);
  }
}
