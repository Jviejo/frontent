import { Injectable, ErrorHandler, Injector } from "@angular/core"
import { ServicioService } from "./servicio.service";

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) {
  }
  handleError(error: any): void {
    const servicio = this.injector.get(ServicioService);
    servicio.errorSubject.next(error.stack);
   
    console.log(error)
    // throw error
  }
}
