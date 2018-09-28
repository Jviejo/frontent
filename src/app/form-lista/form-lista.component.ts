import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';

@Component({
  selector: 'app-form-lista',
  templateUrl: './form-lista.component.html',
  styleUrls: ['./form-lista.component.css']
})
export class FormListaComponent implements OnInit {
  @Input() grupo: FormGroup
  @Input() titulo: string
  constructor(private _fb: FormBuilder) { }
  remove(indice) {
    (this.grupo.controls.lista as FormArray).removeAt(indice);
  }
  addRegistro() {
    return this._fb.group({
      "id": "",
      "nombre": ""
    })
  }
  add() {
    const arr = this.grupo.controls.lista as FormArray;

    arr.push(
      this.addRegistro()
    );

  }
  ngOnInit() {
  }

}
