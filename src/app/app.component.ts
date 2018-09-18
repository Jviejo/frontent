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
  opcion = "httpbasico"
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
    this._servicio.getDatos().subscribe(
      i => {
        console.log(i)
      },
      err => {
        console.log("error", err.message)
      },
    )
    // this._servicio.getFromEvent().subscribe(i => {
    //   console.log("sub1", i)
    // })
    // this.t = new Observable<string>((observer: Observer<string>) => {
    //   setInterval(() => observer.next(new Date().toString()), 1000)
    // })
    this.t = from([1, 2, 3, 4, 5, 6, 6]).pipe(toArray())

    const first = interval(15000)
    const first2 = interval(2500)

    const second2 = merge(first, first2)
    //emit every 1 second

    this.timer$ = second2.pipe(
      scan((acc: any, curr: any) => {
        acc.push(curr)
        return acc
      }, []),
    )
    this.sub$ = this.eventos$.pipe(toArray())
    this.intervalo$ = interval(1000).pipe(
      take(19),
      toArray(),
    )

    this.http2$ = this._servicio.getHttp2().subscribe(response => {
      console.log("body", response.body)
      console.log("keys cabeceras", response.headers.keys())

      console.log("X-CUSTOM", response.headers.get("X-CUSTOM"))
      console.log("X-Powered-By", response.headers.get("X-Powered-By"))
      console.log("Warning", response.headers.get("Warning"))
    })

    this.http$ = this._servicio.getHttp().subscribe(event => {
      if (event.type === HttpEventType.Sent) {
        console.log("sent")
      }
      if (event.type === HttpEventType.DownloadProgress) {
        console.log(event.loaded) //downloaded bytes
        console.log(event.total) //total bytes to download
      }
      if (event.type === HttpEventType.UploadProgress) {
        console.log(event.loaded) //uploaded bytes
        console.log(event.total) //total bytes to upload
      }
      if (event.type === HttpEventType.Response) {
        console.log(event.body)
        console.log("keys cabeceras", event.headers.keys())

        console.log("X-CUSTOM", event.headers.get("X-CUSTOM"))
        console.log("X-Powered-By", event.headers.get("X-Powered-By"))
        console.log("Warning", event.headers.get("Warning"))
      }
    })

    // this._servicio.uploadData().subscribe(i=>{
    //   console.log("upload", i)
    // })
    const datos = this._servicio
      .getDatosSerie()
      .then(res => {
        console.log("after ", res)
      })
      .catch(error => {
        console.log("se ha producido el error", error.message)
      })
  }
}
