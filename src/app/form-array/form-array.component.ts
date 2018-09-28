import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {
  form: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group({
      grupo: this._fb.group({ "nif": "aa", nombre: "nombre" }),
      grupo1: this._fb.group({
        lista: this._fb.array([
        ]),
      }),
      grupo2: this._fb.group({
        lista: this._fb.array([
          this._fb.group({ "id": 2, "nombre": "viejo" }),
          this._fb.group({ "id": 33, "nombre": "jvh" }),
          this._fb.group({ "id": 44, "nombre": "qwwe" })
        ]),
      }),
    })
  }

  ngOnInit() {
  }

}
