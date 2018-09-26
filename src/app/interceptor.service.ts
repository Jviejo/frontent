import { Injectable } from "@angular/core"
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http"
import { Observable, of, from } from "rxjs"
import { timeout, tap } from "rxjs/operators"
@Injectable({
  providedIn: "root",
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const inicio = new Date()
    const r1 = req.clone({
        headers: req.headers.set("token1", "otro").set("accept1", "accept"),
    })
    return next.handle(r1).pipe(
      tap(i => {
         console.log(i)
         const fin = new Date()
        const ms: number = fin.getTime() - inicio.getTime()
        console.log("esta tarda",  ms)
      }),
    )
  }
}
