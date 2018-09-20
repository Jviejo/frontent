import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class S1Service {

  constructor() { }
  f1 () {
    return "vengo de un servicio"
  }
}
