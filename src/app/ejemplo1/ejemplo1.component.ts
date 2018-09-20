import { Component, OnInit } from "@angular/core"
import { CurrencyPipe } from "@angular/common"

@Component({
  selector: " ",
  templateUrl: "./ejemplo1.component.html",
  styleUrls: ["./ejemplo1.component.css"],
})
export class Ejemplo1Component implements OnInit {
  pagina = 1
  objetos = [
    { pag: 5, id: "4", nombre: "JUAN", precio: 3.3 },
    { pag: 1, id: "1", nombre: "MARIO", precio: 4.3 },
    { pag: 1, id: "2", nombre: "JOSE", precio: 5.56 },
    { pag: 1, id: "3", nombre: "ANTONIO", precio: 6.2 },
    { pag: 2, id: "1", nombre: "JUAN", precio: 73 },
    { pag: 2, id: "2", nombre: "JOSE", precio: 8.56 },
    { pag: 2, id: "3", nombre: "ANTONIO", precio: 9.2 },
    { pag: 3, id: "1", nombre: "JUAN", precio: 10.3 },
    { pag: 3, id: "2", nombre: "JOSE", precio: 11.56 },
    { pag: 4, id: "3", nombre: "ANTONIO", precio: 42.2 },
    { pag: 5, id: "4", nombre: "JAIME", precio: 31.3 },
    { pag: 1, id: "1", nombre: "JULIA", precio: 32.3 },
    { pag: 1, id: "2", nombre: "MARIA", precio: 33.56 },
    { pag: 1, id: "3", nombre: "LAURA", precio: 44.2 },
    { pag: 2, id: "1", nombre: "MARINA", precio: 53.3 },
    { pag: 2, id: "2", nombre: "ANGELA", precio: 36.56 },
    { pag: 2, id: "3", nombre: "LAUREL", precio: 47.2 },
    { pag: 3, id: "1", nombre: "MARIO", precio: 38.83 },
    { pag: 3, id: "2", nombre: "JAVIER", precio: 39.56 },
    { pag: 4, id: "3", nombre: "JULIAN", precio: 422.2 },
  ]
  paginas = []
  constructor() {}
  getOrderFN(campo, ascdes) {
    return (a, b) => {
      if (a[campo] > b[campo]) {
        return 1 * ascdes
      }
      if (a[campo] < b[campo]) {
        return -1 * ascdes
      }
      return 0
    }
  }
  verDetalle(objeto) {
    objeto.ver = !objeto.ver
  }
  setPagina(p) {
    this.pagina = p
  }
  verPagina(pag, campo, ascdes) {
    return this.objetos
      .filter(i => i.pag == pag)
      .sort(this.getOrderFN(campo, ascdes))
  }
  getPaginas() {
    const paginas = this.objetos.reduce((acc, i) => {
      acc[i.pag] = 1
      return acc
    }, {})
    return Object.keys(paginas)
  }
  ngOnInit() {}
}
