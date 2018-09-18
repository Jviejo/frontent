import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent, merge, of, zip, interval, from, timer, empty,throwError } from 'rxjs';
import { ServicioService } from '../servicio.service';
import { map, catchError, scan, toArray, retryWhen, delayWhen, tap, retry } from 'rxjs/operators';
import { resolve } from 'url';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {
  reloj$: Observable<Date>
  t1$: Observable<any>;
  slow$: Observable<any>
  promesas$: Observable<any>
  obs$: any;
  intentos$: Observable<number>;
  intentos1$: Observable<number>;

  constructor(private _servicio: ServicioService) { }

  ngOnInit() {
    let reintentos = 0;

    this.intentos$ = interval(1000).pipe(
      map(valor => {
        if (valor > 2) {
          throw 'error';
        } else {
          return valor;
        }
      }),
     retry(2),
      scan((acc: any, curr: any) => {
        acc.push(curr)
        return acc
      }, [])
    )


    this.intentos1$ = interval(1000).pipe(
      map(valor => {
        if (valor > 2) {
          throw valor;
        } else {
          return valor;
        }
      }),
      retryWhen(errors => {
        reintentos++
        return errors.pipe(
          tap(i=>{console.log('reintentos',i, reintentos)}),
          delayWhen(v =>  reintentos++ < 2 ? timer(1000): empty())
        )
      }
      ),
      scan((acc: any, curr: any) => {
        acc.push(curr)
        return acc
      }, [])
    )

    this.reloj$ = this._servicio.reloj()

    this.obs$ = Observable.create((observer) => {
      let c = 0;
      interval(1000).subscribe(i => {
        observer.next(c++)
        if (c % 3 == 0){
          observer.error("error ...")
        }
        if (c > 20) {
          observer.complete()
        }
      })
    }).pipe(
      catchError(error => of(error)),
      scan((acc: any, curr: any) => {
      acc.push(curr)
      return acc
    }, []), )

    this.promesas$ = merge(
      from(
        new Promise<any>((resolve, reject) => {
          timer(5000, 10000).subscribe(i => {
            resolve(1000);
          })
        })
      ),
      from(
        new Promise<any>((resolve, reject) => {
          timer(5000, 10000).subscribe(i => {
            resolve(2000);
          })
        })
      )
    ).pipe(toArray());

    this.slow$ = zip(
      from(['juan', 'ramon', 'antonio']),
      interval(2000)
    ).pipe(toArray())

    this.t1$ = merge(
      fromEvent(document, "click"),
      fromEvent(document, "keyup"),
      fromEvent(document, "mousedown"),
      fromEvent(document, "mouseup"),
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
      scan((acc: any, curr: any) => {
        acc.push(curr)
        return acc
      }, []),
    )


  }

}
