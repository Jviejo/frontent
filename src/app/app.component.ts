import { Component, HostListener } from "@angular/core"
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

  @HostListener("document:keyup", ["$event"])
  clickout($event) {
    this.eventos$.next($event)
    console.log("click", $event)
  }

  constructor(public _servicio: ServicioService) {
   
  }
}
