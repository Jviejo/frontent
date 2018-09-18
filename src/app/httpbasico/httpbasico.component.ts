import { Component, OnInit } from "@angular/core"
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable, merge, concat } from "rxjs"
import { tap, toArray, concatAll, mergeAll, map } from "rxjs/operators"
import { environment } from "../../environments/environment"

@Component({
  selector: "app-httpbasico",
  templateUrl: "./httpbasico.component.html",
  styleUrls: ["./httpbasico.component.css"],
})
export class HttpbasicoComponent implements OnInit {
  private urlApi = environment.api
  fichas$: Observable<any>

  constructor(public _http: HttpClient) {}
  doble() {
    this.fichas$ = concat(
      this._http.get(`${this.urlApi}/fichas.json`),
      this._http.get(`${this.urlApi}/fichas.json`),
    ).pipe(
      concatAll(),
      toArray(),
    )
  }
  simple() {
    this.fichas$ = this._http.get(`${this.urlApi}/fichas.json`)
  }
  ngOnInit() {}
}
