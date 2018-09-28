import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { timer } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-form-lista',
  templateUrl: './form-lista.component.html',
  styleUrls: ['./form-lista.component.css']
})
export class FormListaComponent implements OnInit {
  @Input() grupo: any
  @Input() titulo: string

  lockedWindow: any;
  constructor(private _fb: FormBuilder, private modalService: NgbModal) { }
  remove(indice) {
    (this.grupo.controls.lista as FormArray).removeAt(indice);
  }
  addRegistro() {
    return this._fb.group({
      "id": "",
      "nombre": ""
    })
  }
  open(content, indice) {
    this.lockedWindow = this.modalService.open(content, { centered: true })
    this.lockedWindow.result.then((result) => {
      console.log(`Closed with: ${result}`);
      this.remove(indice);
    }, (reason) => {
      console.log(`Se cancela: ${reason}`);
    });
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
