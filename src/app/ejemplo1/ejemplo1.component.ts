import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-ejemplo1',
  templateUrl: './ejemplo1.component.html',
  styleUrls: ['./ejemplo1.component.css']
})
export class Ejemplo1Component implements OnInit {
  pagina = 1;
  objetos = [
    { pag: 5, id: "4", nombre: "JUAN", precio: 3.3 },
    { pag: 1, id: "1", nombre: "JUAN", precio: 3.3 },
    { pag: 1, id: "2", nombre: "JOSE", precio: 3.56 },
    { pag: 1, id: "3", nombre: "ANTONIO", precio: 4.20 },
    { pag: 2, id: "1", nombre: "JUAN", precio: 3.3 },
    { pag: 2, id: "2", nombre: "JOSE", precio: 3.56 },
    { pag: 2, id: "3", nombre: "ANTONIO", precio: 4.20 },
    { pag: 3, id: "1", nombre: "JUAN", precio: 3.3 },
    { pag: 3, id: "2", nombre: "JOSE", precio: 3.56 },
    { pag: 4, id: "3", nombre: "ANTONIO", precio: 4.20 }
  ]
  paginas = [];
  constructor() { }

  getObjetosOrderByNombre(ascdes) {
    return this.objetos.sort((a, b) => {
      if (a.nombre > b.nombre) {
        return 1 * ascdes;
      }
      if (a.nombre < b.nombre) {
        return -1 * ascdes;
      }
      // a must be equal to b
      return 0;
    })
  }
  verDetalle(objeto) {
    objeto.ver = !objeto.ver;
  }

  setPagina(p) {
    this.pagina = p;
  }
  verPagina(pag) {
    return this.objetos.filter(i => i.pag == pag);
  }
  getPaginas() {
    const paginas = this.objetos.reduce((acc, i) => 
        { acc[i.pag] = 1; return acc }, {})
    console.log(paginas);
    return Object.keys(paginas);
  }
  ngOnInit() {

  }

}
