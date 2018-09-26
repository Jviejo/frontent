import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core"

@Component({
  selector: "app-errores",
  templateUrl: "./errores.component.html",
  styleUrls: ["./errores.component.css"],
})
export class ErroresComponent implements OnInit, OnChanges {

  constructor() {}

  ngOnInit() {
    throw "Method not implemented."
  }
  ngOnChanges(changes: SimpleChanges): void {
 
  }
}
