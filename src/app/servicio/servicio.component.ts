import { Component, OnInit, Inject } from '@angular/core';
import { S1Service } from '../s1.service'
import { S2Service } from '../s2.service'
import { USE_VALUE } from '@angular/core/src/di/injector';


const factoria = () => ({
  f1 : () => { return 'soy una factoria' }
});
@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css'],
  providers: [
    { provide: 'nombre' ,  useValue: 'JUAN' },
    { provide: 'S2Alias', useClass: S2Service },
    { provide: 'funcion', useFactory: factoria },
    { provide: S2Service, useClass:S2Service},
  ]
})


export class ServicioComponent implements OnInit {
  resultado: string;
  resultado2: string;

  constructor(
    private _s1: S1Service,
    private _s2: S2Service,
    @Inject('nombre') public nombre,
    @Inject('S2Alias') public _s2Alias,
    @Inject('funcion') public _factoria,
  ) {

  }

  ngOnInit() {
    this.resultado = this._s1.f1() + this._factoria.f1()
    this.resultado2 = this._s2.f1();
  }

}
