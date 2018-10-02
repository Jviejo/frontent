import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-formsimple',
  templateUrl: './formsimple.component.html',
  styleUrls: ['./formsimple.component.css']
})
export class FormsimpleComponent implements OnInit {
  control1: FormControl
  control2: FormControl
  grupo: FormGroup
  formArray: FormArray;
  formArray2: FormArray;
  constructor() {
    this.control1 = new FormControl(111);
    this.control1.setValidators([

      (control) => {
        if (control.value === 'ABC') {
          return {
            fallo: {
              codigo: 1,
              descripcion: "hay un error en el nombre"
            }
          }
        }
      }])
    this.control1.setAsyncValidators(this.asyncValidator);
    this.control2 = new FormControl('NOMBRE');
    this.grupo = new FormGroup({
    });
    this.grupo.addControl("control1", this.control1)
    this.grupo.addControl("control2", this.control2)
    this.grupo.setValidators((control: FormGroup) => {
      if (control.controls.control1.value === "ABC" && control.controls.control2.value === "123") {
        return {
          errorGrupo: {
            codigo: 1,
            descripcion: "Hay un error en el formulario"
          }
        }
      }
    })
    this.createFormArray();
    this.createComplexArray();
  }
  createComplexArray() {
    this.formArray2 = new FormArray([])
  }
  add2() {
    this.formArray2.push(new FormGroup({ id: new FormControl(""), 
    nombre: new FormControl("") }))
  }
  remove2(i) {
    this.formArray2.removeAt(i)
  }


  createFormArray() {
    this.formArray = new FormArray(
      [1, 3, 4, 4].map(i => new FormControl(i, (control) => {
        if (control.value % 2 !== 0) {
          return {
            errorGrupo: {
              codigo: 1235,
              descripcion: "el número debe de ser par"
            }
          }
        } else {
          return null;
        }
      }))
    );
    this.formArray.setValidators((arr: FormArray) => {
      const total: number = arr.controls.reduce((acc: number, control: FormControl) =>
        acc + parseInt(control.value), 0)
      console.log(total)
      if (total !== 10) {
        return {
          errorGrupo: {
            codigo: 111,
            descripcion: "No suma 10"
          }
        }
      } else {
        return null;
      }
    })
  }
  add() {
    this.formArray.push(new FormControl())
  }
  remove(i) {
    this.formArray.removeAt(i)
  }
  asyncValidator = (control) => {
    return timer(10000).pipe(map(i => {
      if (control.value.length < 5) {
        return {
          errorArray: {
            array: "nombre del array",
            codigo: 1,
            descripcion: "Error en la validación asincrona"
          }
        }
      } else {
        return null;
      }
    }))
  }
  ngOnInit() {
  }

}
