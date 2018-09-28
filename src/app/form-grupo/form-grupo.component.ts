import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-grupo',
  templateUrl: './form-grupo.component.html',
  styleUrls: ['./form-grupo.component.css']
})
export class FormGrupoComponent implements OnInit {
  @Input() grupo: FormGroup
  @Input() titulo: string
  constructor() { }

  ngOnInit() {
  }

}
