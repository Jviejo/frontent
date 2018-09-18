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
  opcion ="http"
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
  setIdioma(idioma) {
    this._servicio.idioma = idioma
  }

  @HostListener("document:keyup", ["$event"])
  clickout($event) {
    this.eventos$.next($event)
    console.log("click", $event)
  }

  constructor(public _servicio: ServicioService) {
    this.fichas = [
      {
        _id: "5b98c7a937ce4ea9dc625f84",
        index: 0,
        guid: "b0af953c-efb9-4e4b-8e28-eed203fd371c",
        picture: "https://loremflickr.com/320/240/?id=" + Math.random(),
        age: 20,
        name: "Cook Conley",
        company: "ECRATIC",
        email: "cookconley@ecratic.com",
        phone: "+1 (850) 418-3065",
        address: "733 Bedford Place, Vincent, Nebraska, 2325",
        about:
          "Consectetur culpa elit non Lorem Lorem occaecat anim aute cillum. Commodo sint sint et dolore esse dolore est id veniam ex elit dolor ad mollit. Voluptate voluptate esse amet deserunt qui cupidatat Lorem. Mollit aute voluptate sint Lorem veniam exercitation.\r\n",
        registered: "2015-03-03T01:12:17 -01:00",
        latitude: -22.067974,
        longitude: -126.955607,
      },
      {
        _id: "5b98c7a90c52157b602ba3b5",
        index: 1,
        guid: "31d19b82-e55a-444b-b689-ac82fca8d229",
        picture: "https://loremflickr.com/320/240/?id=" + Math.random(),
        age: 38,
        name: "Carrie Hernandez",
        company: "TALKOLA",
        email: "carriehernandez@talkola.com",
        phone: "+1 (894) 422-3289",
        address: "386 Broome Street, Murillo, Utah, 614",
        about:
          "Sit mollit id ad incididunt eu minim. Irure qui reprehenderit tempor nisi veniam in. Proident ut sit do ullamco excepteur consectetur sunt veniam. Reprehenderit consectetur ad ullamco in ex sit. Eiusmod do adipisicing est cillum. Velit nisi aliqua cillum Lorem do voluptate velit do.\r\n",
        registered: "2015-09-13T05:33:21 -02:00",
        latitude: -37.97531,
        longitude: 61.404636,
      },
      { 
        _id: "5b98c7a918c6b5a686884be1",
        index: 2,
        guid: "63be84a2-5c3d-4d26-8f4d-54a71a288176",
        picture: "https://loremflickr.com/320/240/?id=" + Math.random(),
        age: 23,
        name: "Kitty Vaughan",
        company: "INTRAWEAR",
        email: "kittyvaughan@intrawear.com",
        phone: "+1 (937) 475-3078",
        address: "863 Truxton Street, Dexter, Texas, 9248",
        about:
          "Minim consequat ad labore excepteur amet duis quis dolore ad consequat et laborum. Proident ea nostrud ea ea exercitation esse veniam commodo. Fugiat occaecat officia consequat sit elit laboris. Esse voluptate dolor culpa occaecat fugiat non tempor labore quis elit. Ipsum est id tempor irure excepteur anim. Sint labore esse sunt occaecat aliqua in dolor cupidatat enim excepteur ullamco sunt labore veniam.\r\n",
        registered: "2014-04-17T04:48:52 -02:00",
        latitude: 51.526193,
        longitude: -80.218825,
      },
      {
        _id: "5b98c7a96f820ffdb106a72a",
        index: 3,
        guid: "6ccc6f9a-4b02-47d6-85f1-b3c361b1ebd9",
        picture: "https://loremflickr.com/320/240/?id=" + Math.random(),
        age: 23,
        name: "Moody Reynolds",
        company: "ISOPLEX",
        email: "moodyreynolds@isoplex.com",
        phone: "+1 (843) 471-2492",
        address: "835 Verona Street, Moquino, Vermont, 9398",
        about:
          "Commodo sint nostrud laboris mollit sunt aliquip fugiat minim incididunt sit dolore exercitation ea. Non consectetur id nostrud aliqua aliquip incididunt aute sint tempor quis cupidatat. Sint dolor est eu in ad pariatur velit duis duis in quis in. Incididunt ad id dolore commodo nostrud labore occaecat laboris sit. Excepteur consequat consequat culpa laboris.\r\n",
        registered: "2015-10-17T10:28:58 -02:00",
        latitude: -5.819583,
        longitude: 161.591211,
      },
      {
        _id: "5b98c7a9ac12c68905f2808f",
        index: 4,
        guid: "421f07b2-e2fc-40de-acdd-b09a7250cd8b",
        picture: "https://loremflickr.com/320/240/?id=" + Math.random(),
        age: 26,
        name: "Keller Todd",
        company: "FLUMBO",
        email: "kellertodd@flumbo.com",
        phone: "+1 (817) 406-2092",
        address: "189 Chapel Street, Carbonville, Guam, 2860",
        about:
          "Cillum commodo velit sunt consequat velit sunt irure sint reprehenderit Lorem commodo qui. Laborum aliqua dolore tempor anim aute incididunt. Consectetur aliqua enim elit aliquip minim laboris non mollit irure dolor eiusmod sit nostrud elit. Est id sint et elit nulla do. Do consequat officia proident anim fugiat esse Lorem qui elit duis.\r\n",
        registered: "2016-12-14T08:00:09 -01:00",
        latitude: 49.339114,
        longitude: 38.947092,
      },
      {
        _id: "5b98c7a9f07b374c6804d40a",
        index: 5,
        guid: "e2966f63-4c79-4bf4-ae5d-7eec420bdc4b",
        picture: "https://loremflickr.com/320/240/?id=" + Math.random(),
        age: 20,
        name: "Rogers Fields",
        company: "RENOVIZE",
        email: "rogersfields@renovize.com",
        phone: "+1 (830) 491-3127",
        address: "188 Emerald Street, Rehrersburg, Kansas, 9534",
        about:
          "Lorem aliqua veniam eiusmod Lorem eiusmod sint ut laboris voluptate exercitation esse. Exercitation sit excepteur consectetur fugiat dolore reprehenderit reprehenderit enim occaecat id. Reprehenderit ex cupidatat in exercitation. Amet sint id duis minim qui sint ea magna do reprehenderit mollit.\r\n",
        registered: "2018-09-07T05:50:59 -02:00",
        latitude: 72.263075,
        longitude: 88.054769,
      },
      {
        _id: "5b98c7a9bb4299adc433710f",
        index: 6,
        guid: "bece2686-3f3b-435f-85a2-0c373d12b470",
        picture: "https://loremflickr.com/320/240/?id=" + Math.random(),
        age: 29,
        name: "Meyer Pope",
        company: "PHORMULA",
        email: "meyerpope@phormula.com",
        phone: "+1 (829) 496-2549",
        address: "137 Stoddard Place, Valmy, New Mexico, 5898",
        about:
          "Non tempor ex aute do ullamco qui cupidatat pariatur irure cupidatat elit sit minim. Non elit fugiat qui incididunt adipisicing enim consectetur commodo laborum est do. Occaecat duis sint adipisicing magna in reprehenderit ipsum occaecat anim sunt reprehenderit exercitation. Nostrud ullamco ex et anim elit mollit dolore dolore voluptate cillum aute. Adipisicing magna ea cillum cupidatat magna elit voluptate excepteur nisi. Laboris veniam sit reprehenderit culpa eu velit eu.\r\n",
        registered: "2016-01-10T07:42:04 -01:00",
        latitude: 5.435818,
        longitude: 129.187857,
      },
    ]
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
