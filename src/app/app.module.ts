import { BrowserModule, Title } from "@angular/platform-browser"
import { NgModule, APP_INITIALIZER } from "@angular/core"
import { NgbModule } from "@ng-bootstrap/ng-bootstrap"
import { AppComponent } from "./app.component"
import { CardComponent } from "./clientes/card/card.component"
import { TableComponent } from "./clientes/table/table.component"
import { I18nDirective } from "./directive/i18n.directive"
import {
  HttpClientModule,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from "@angular/common/http"
import { ServicioService } from "./servicio.service"
import { InterceptorService } from "./interceptor.service";
import { Ejemplo1Component } from './ejemplo1/ejemplo1.component';
import { RxComponent } from './rx/rx.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { HttpComponent } from './http/http.component';
import { ErroresComponent } from './errores/errores.component';
import { ServicioComponent } from './servicio/servicio.component';
import { HttpbasicoComponent } from './httpbasico/httpbasico.component';
import { InitComponent } from './init/init.component'

@NgModule({
  declarations: [AppComponent, 
    CardComponent, 
    TableComponent, 
    I18nDirective, 
    Ejemplo1Component, RxComponent, DirectivaComponent, HttpComponent, ErroresComponent, ServicioComponent, HttpbasicoComponent, InitComponent],
  imports: [BrowserModule, NgbModule, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (servicio: ServicioService) =>
        function() {
          return servicio.getI18n()
        },
      deps: [ServicioService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private _title: Title) {
    this._title.setTitle("TITULO 2")
  }
}
