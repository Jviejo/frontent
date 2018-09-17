import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, merge, of } from 'rxjs';
import { ServicioService } from '../servicio.service';
import { map, catchError, scan } from 'rxjs/operators';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {
  reloj$: Observable<Date>
  t1$: Observable<any>;
  constructor(private _servicio: ServicioService) { }

  ngOnInit() {
    this.reloj$ = this._servicio.reloj()

    this.t1$ = merge(
      fromEvent(document, "click"),
      fromEvent(document, "keyup"),
    ).pipe(
      map(({ type, x, y, code, altKey, ctrlKey, shiftKey }: any) => {
        return {
          type,
          x,
          y,
          code,
          altKey,
          ctrlKey,
          shiftKey,
        }
      }),
      catchError(error => of(error)),
      scan((acc: any, curr: any) => {
        acc.push(curr)
        return acc
      }, []),
    )


  }

}
