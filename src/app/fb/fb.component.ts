import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-fb',
  templateUrl: './fb.component.html',
  styleUrls: ['./fb.component.css']
})
export class FbComponent implements OnInit {
  form: FormGroup
  constructor(private _fb: FormBuilder) {
    this.form = this._fb.group(
      {
        id: "",
        nombre: "",
        array: this._fb.array([])
      }
    )
  }
  remove (indice) {
    (this.form.get('array') as FormArray).removeAt(indice)
  }
  add() {
    let elementos = this.form.get('array') as FormArray;
    debugger
    elementos.push(this._fb.group({
      id: "",
      nombre: ""
    }))
  }

  ngOnInit() {
  }

}
