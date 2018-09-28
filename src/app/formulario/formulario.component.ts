import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { interval, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  formulario: FormGroup;
  constructor(private _fb: FormBuilder) {
    this.formulario = new FormGroup({
      "nombre": new FormControl("", [Validators.required, Validators.maxLength(10), this.customValidator],
        this.nombreValidatorAsync.bind(this)),
      "dia": new FormControl(moment().format("YYYY-MM-DD")),
      "fecha": new FormControl(moment().format("YYYY-MM-DDTHH:mm"))
    })

    this.formulario.addControl("importe", new FormControl(988.121));
    this.formulario.controls["importe"].setValidators(Validators.required)


    this.formulario.setValidators([this.formValidator,
    (form: FormGroup) => {
      if (form.controls.nombre.value == 'AAA'
        && form.controls.importe.value == 12) {
        return {
          asincrono: {
            codigo: 2,
            nombre: "EL NOMBRE NOM PUEDE SER AAAA Y EL IMPORTE = 12"
          }
        }
      }
      return null;
    }
    ]);

    // this.formulario = this._fb.group({
    //   nombre: ["pepe", [Validators.required, Validators.maxLength(10)]],
    //   dia: moment().format("YYYY-MM-DD"),
    //   fecha: moment().format("YYYY-MM-DDTHH:mm"),
    //   importe: [988.121, Validators.required]
    // })
  }
  submit() {

  }
  nombreValidatorAsync(control: FormControl) {
    return timer(1000).pipe(map(i => {
      if (control.value == "B") {
        return {
          asincrono: {
            codigo: 1,
            descripcion: "desde un async"
          }
        }
      } else {
        return null;
      }
    }
    ))
  }
  formValidator(form: FormGroup) {
    if (form.controls.importe.value == 10) {
      form.controls.importe.setErrors({
        importe:{
          codigo:22,
          descripcion:"el importe no puede ser 10"
        }
      })
      return {
        formulario: {
          codigo: 1,
          descripcion: "el formulario ..."
        }
      }
    } else {
      return null;
    }

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
  setImporte() {
    this.formulario.patchValue({
      importe: 888.88,
      nombre: "NUEVO NOMBRE"
    })
    // se marca el control como modificado
    this.formulario.controls.nombre.markAsDirty()
  }
  ngOnInit() {
  }

}
