import { Injectable } from "@angular/core"
import { Subject, Observable, fromEvent } from "../../node_modules/rxjs"
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"
import { forkJoin, interval } from "rxjs"
import { toArray, map, tap } from "rxjs/operators"
import { environment } from "../environments/environment"

@Injectable({
  providedIn: "root",
})
export class ServicioService {
  constructor(private _http: HttpClient) {}
  private _idioma = "es"
  private urlApi = environment.api
  get idioma(): string {
    return this._idioma
  }
  set idioma(idioma: string) {
    this._idioma = idioma
    this.idiomaChange.next(this._idioma)
  }
  idiomaChange: Subject<string> = new Subject<string>()
  i18n = {}

  async getDatosSerie() {
    let datos1 = null
    let datos2 = null
    try {
      datos1 = await this._http.get("assets/datos.json").toPromise()
      console.log("before datos 2", datos1)
      if (datos1 === 1) {
        throw Error("no se puede")
      }
    } catch (error) {
      return Promise.reject(error)
    }
    try {
      datos2 = await this._http.get("assets/datos.1.json").toPromise()
      console.log("before datos 2", datos1)
      if (datos1 === 1) {
        throw Error("no se puede")
      }
    } catch (error) {
      return Promise.reject(error)
    }
    console.log("before return", datos2)
    return Promise.resolve({ datos1, datos2 })
  }

  getDatos() {
    const headers = new HttpHeaders().set("id", "sesion-id")
    const arrLLamadas = [
      this._http.get(`${this.urlApi}/10000`, {
        responseType: "text",
        headers,
      }),
    ]
    return forkJoin(arrLLamadas)
  }

  getI18n(): Promise<any> {
    return this._http
      .get("assets/i18n.json")
      .toPromise()
      .then(data => {
        this.i18n = data
        return data
      })
  }
  // rxjs
  getFromEvent() {
    return fromEvent(document, "click")
  }
  getHttp() {
    return this._http.get(`${this.urlApi}/1000`, {
      responseType: "text",
      observe: "events",
      reportProgress: true,
    })
  }
  getHttp2() {
    return this._http.get(`${this.urlApi}/1000`, {
      responseType: "text",
      observe: "response",
    })
  }
  reloj() {
    return interval(1000).pipe(map(i => new Date()))
  }

  uploadData($event) {
    // tomamos el primer fichero
    var file = $event.target.files[0]
    // creamos el formdata
    var formData = new FormData()
    //var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // an array consisting of a single DOMString
    //var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); // the blob
    formData.append("file", file, file.name)
    this._http.post(`${this.urlApi}/upload`, formData).subscribe((i: any) => {
      console.log(i)
    })
  }
  uploadDataMultiple($event) {
    // tomamos el primer fichero
    var formData = new FormData()
    const files = $event.target.files
    for (let index = 0; index < files.length; index++) {
      const file = files.item(index)
      formData.append("file", file, file.name)
    }
    this._http
      .post(`${this.urlApi}/uploadMultiple`, formData)
      .subscribe((i: any) => {
        console.log(i)
      })
  }
}
