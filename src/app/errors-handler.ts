import { Injectable, ErrorHandler } from "@angular/core"

@Injectable()
export class ErrorsHandler implements ErrorHandler {
  handleError(error: any): void {
    console.log(error)
  }
}
