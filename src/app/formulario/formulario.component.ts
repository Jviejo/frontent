import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.formulario = new FormGroup({
      "nif": new FormControl(""),
      "provincia": new FormControl("3"),
      "check": new FormControl(true),
      "radio": new FormControl('3'),
      "nombre": new FormControl("", [Validators.required, Validators.maxLength(10), this.customValidator]),
      "dia": new FormControl(moment().format("YYYY-MM-DD")),
      "fecha": new FormControl(moment().format("YYYY-MM-DDTHH:mm"))
    })

    this.formulario.addControl("importe", new FormControl(988.121));
    this.formulario.controls["importe"].setValidators(Validators.required)

    // this.formulario = this._fb.group({
    //   nombre: ["pepe", [Validators.required, Validators.maxLength(10)]],
    //   dia: moment().format("YYYY-MM-DD"),
    //   fecha: moment().format("YYYY-MM-DDTHH:mm"),
    //   importe: [988.121, Validators.required]
    // })
  }
  submit() {

  }

  customValidator(control: FormControl) {
    if (control.value.length === 3) {
      return {
        custom: {
          codigo: 120,
          descripcion: "tenemos un problema, el nombre no puede tener 3 caracteres "
        }
      };
    } else {
      return null;
    }
  }
  setImporte(valor) {
    this.formulario.patchValue({
      importe: valor,
      nombre: "NUEVO NOMBRE"
    })
    this.formulario.controls.nombre.markAsDirty();
    this.formulario.controls.importe.markAsDirty();
  }
  ngOnInit() {
  }

}
