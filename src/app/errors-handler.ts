import { Injectable, ErrorHandler, Injector } from "@angular/core"
import { ServicioService } from "./servicio.service";

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  
  /**
   *
   */
  constructor(private injector: Injector) {
    
    
  }
  handleError(error: any): void {
    let servicio = this.injector.get(ServicioService);
    servicio.error = error;
    console.log(error, error.code)
    // throw error
   
  }
}
