import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit {
  @Input() control: FormControl
  @Input() titulo: string
  @Input() descripcion: string
  @Input() placeHolder: string
  @Input() id: string
  @Input() title: string
  @Input() debug = false;

  constructor() { }

  ngOnInit() {
  }

}
