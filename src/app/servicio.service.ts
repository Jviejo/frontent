import { Injectable } from '@angular/core';
import { Subject } from '../../node_modules/rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  private _idioma = 'es';
  get idioma(): string {
    return this._idioma;
  }
  set idioma(idioma: string) {
    this._idioma = idioma;
    this.idiomaChange.next(this._idioma);
  }
  idiomaChange: Subject<string> = new Subject<string>();
  i18n = {};
  constructor(private _http: HttpClient) {

  }
  getI18n(): Promise<any>  {
    return this._http.get('../../assets/i18n.json')
      .toPromise()
      .then(data => {
        this.i18n = data;
        return data;
      });
  }
}
