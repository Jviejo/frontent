import { Injectable } from "@angular/core"
import { Subject, Observable, fromEvent } from "../../node_modules/rxjs"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { forkJoin } from "rxjs"
import { toArray } from "rxjs/operators"

@Injectable({
  providedIn: "root",
})
export class ServicioService {
  constructor(private _http: HttpClient) {}
  private _idioma = "es"
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
      this._http.get("http://192.168.99.1:8081/src/assets/datos.json", {
        headers,
      }),
      this._http.get("http://192.168.99.1:8081/src/assets/datos.1.json", {
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
}
