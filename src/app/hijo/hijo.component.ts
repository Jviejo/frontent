import {
  Component,
  OnInit,
  Input,
  OnChanges,
  EventEmitter,
  Output,
} from "@angular/core"

@Component({
  selector: "app-hijo",
  templateUrl: "./hijo.component.html",
  styleUrls: ["./hijo.component.css"],
})
export class HijoComponent implements OnInit, OnChanges {
  @Input()
  p1
  @Output()
  salida = new EventEmitter()
  constructor() {}

  ngOnInit() {}
  enviarAlPadre() {
    this.salida.emit({ id: 111, nombre: "ANTONIO MARTINEZ" })
  }
  ngOnChanges() {
    console.log("se ha cambiado la propiedad")
    this.p1 += " esto lo pone el hijo"
  }
}
