import { Directive, Input, AfterViewInit, Renderer2, ElementRef, OnChanges } from '@angular/core';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';
import { ServicioService } from '../servicio.service';


@Directive({
  selector: '[appI18n]'
})

export class I18nDirective implements AfterViewInit {
  @Input() id: string;
  idioma: string;
  _subscription: any;

  constructor(private _renderer: Renderer2, private sanitizer: DomSanitizer, private _elRef: ElementRef,
    private _servicio: ServicioService) {
    // this._renderer.addClass(this._elRef.nativeElement, 'display-1');
    this._subscription = this._servicio.idiomaChange.subscribe((value) => {
      const texto = this._servicio.i18n[value].find(i => i.id === this.id).texto;
      this._renderer.setProperty(this._elRef.nativeElement, 'innerHTML', texto);
      this._renderer.setProperty(this._elRef.nativeElement, 'innerHTML', texto);
    });
  }

  ngAfterViewInit(): void {
    const texto = this._servicio.i18n[this._servicio.idioma] &&
                  this._servicio.i18n[this._servicio.idioma].find(i => i.id === this.id).texto;
    this._renderer.setProperty(this._elRef.nativeElement, 'innerHTML', texto);
  }
}
