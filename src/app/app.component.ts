import { Component, HostListener, ChangeDetectorRef } from "@angular/core"
import { Title } from "@angular/platform-browser"
import { ServicioService } from "./servicio.service"
import {
  of,
  Observable,
  Observer,
  fromEvent,
  Subject,
  from,
  throwError,
  timer,
  merge,
  interval,
  Subscription,
} from "rxjs"
import {
  map,
  take,
  toArray,
  tap,
  scan,
  catchError,
  mapTo,
} from "rxjs/operators"
import { TableComponent } from "./clientes/table/table.component"
import { HttpEventType } from "@angular/common/http"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [Title],
})
export class AppComponent {
  opcion = "http"
  fichas = []
  mode = "table"
  title = "front-end"
  t: any
  t1$: any
  eventos$: Subject<any> = new Subject()
  sub$: Observable<any[]>
  timer$: Observable<any>
  http$: any
  http2$: any
  intervalo$: Observable<{}[]>
  reloj$: Observable<Date>
  error: string;
  ifError = false;
  subcription: Subscription;


  clearError() {
    this.error = null;
    this.ifError = false;
    this.changeDetectorRef.detectChanges();
    console.log("clear")
  }
  constructor(public _servicio: ServicioService, private changeDetectorRef: ChangeDetectorRef) {
    this.subcription = this._servicio.errorSubject.subscribe(i => {
      console.log("aqui llega", i)
      this.error = i;
      this.ifError = true;
      this.changeDetectorRef.detectChanges();
    })
  }
}
