import { Component, OnInit } from "@angular/core"
import { Subject } from "rxjs"
import { ServicioService } from "../servicio.service"

@Component({
  selector: "app-directiva",
  templateUrl: "./directiva.component.html",
  styleUrls: ["./directiva.component.css"],
})
export class DirectivaComponent implements OnInit {

  constructor(public _servicio: ServicioService) {}

  ngOnInit() {}
}
