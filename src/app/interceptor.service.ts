import { Injectable } from "@angular/core"
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "../../node_modules/@angular/common/http"
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
    console.log("inicio rea", new Date())
    console.log("headers ", req.headers.keys())
    from(req.headers.keys()).subscribe(i => {
      console.log(i, ":", req.headers.get(i))
    })
    const r1 = req.clone({
      headers: req.headers.set("token1", "otro").set("accept1", "accept"),
    })
    return next.handle(r1).pipe(
      tap(i => {
        console.log(i)

        const ms = new Date() - inicio
        console.log("fin", ms, i.type)
      }),
    )
  }
}
