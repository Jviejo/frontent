import {
  Directive,
  Input,
  AfterViewInit,
  Renderer2,
  ElementRef,
  OnChanges,
  OnDestroy,
} from "@angular/core"
import { DomSanitizer } from "@angular/platform-browser"
import { ServicioService } from "../servicio.service"
import { Subscription } from "rxjs";

@Directive({
  selector: "[appI18n]",
})
export class I18nDirective implements AfterViewInit, OnDestroy {
  @Input()
  id: string
  idioma: string
  _subscription: Subscription

  constructor(
    private _renderer: Renderer2,
    private _elRef: ElementRef,
    private _servicio: ServicioService,
  ) { }
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
  setIdioma(idioma, id) {
    const texto =
      this._servicio.i18n[idioma].find(i => i.id === id)
        .texto
    this._renderer.setProperty(this._elRef.nativeElement, "innerHTML", texto)
  }
  ngAfterViewInit(): void {
    this._subscription = this._servicio.idiomaChange.subscribe(value => {
      this.setIdioma(value, this.id)
    })
    this.setIdioma(this._servicio.idioma, this.id)
  }
}
