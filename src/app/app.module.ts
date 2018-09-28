import { BrowserModule, Title } from "@angular/platform-browser"
import {
  NgModule,
  APP_INITIALIZER,
  APP_BOOTSTRAP_LISTENER,
  ErrorHandler,
} from "@angular/core"
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
import { InterceptorService } from "./interceptor.service"
import { Ejemplo1Component } from "./ejemplo1/ejemplo1.component"
import { RxComponent } from "./rx/rx.component"
import { DirectivaComponent } from "./directiva/directiva.component"
import { HttpComponent } from "./http/http.component"
import { ErroresComponent } from "./errores/errores.component"
import { ServicioComponent } from "./servicio/servicio.component"
import { HttpbasicoComponent } from "./httpbasico/httpbasico.component"
import { environment } from "../environments/environment"
import { S2Service } from "./s2.service"
import { ErrorsHandler } from "./errors-handler";
import { PadreComponent } from './padre/padre.component';
import { HijoComponent } from './hijo/hijo.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ReactiveFormsModule} from '@angular/forms';
import { FormArrayComponent } from './form-array/form-array.component';
import { FormListaComponent } from './form-lista/form-lista.component';
import { FormGrupoComponent } from './form-grupo/form-grupo.component';
import { FormInputComponent } from './form-input/form-input.component'
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    TableComponent,
    I18nDirective,
    Ejemplo1Component,
    RxComponent,
    DirectivaComponent,
    HttpComponent,
    ErroresComponent,
    ServicioComponent,
    HttpbasicoComponent,
    PadreComponent,
    HijoComponent,
    FormularioComponent,
    FormArrayComponent,
    FormListaComponent,
    FormGrupoComponent,
    FormInputComponent,
  ],
  imports: [BrowserModule, NgbModule, HttpClientModule, ReactiveFormsModule, NgbModule.forRoot()],
  providers: [
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },

    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: () =>
        function() {
          return true
        },
      deps: [ServicioService],
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
    this._title.setTitle("TITULO" + environment.api)
  }
}
