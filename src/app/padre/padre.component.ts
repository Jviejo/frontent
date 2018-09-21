import { Component, OnInit } from "@angular/core"

@Component({
  selector: "app-padre",
  templateUrl: "./padre.component.html",
  styleUrls: ["./padre.component.css"],
})
export class PadreComponent implements OnInit {
  propiedad: string
  valor: string
  delHijo: any
  c = 0
  constructor() {}
  cambiar() {
    this.propiedad = "ESTE ES EL VALOR CAMBIADO" + this.c++
  }
  presentarInfoDelHijo($event) {
    this.delHijo = $event
  }
  ngOnInit() {
    this.propiedad = "ESTE ES EL VALOR INICIAL"
  }
}
