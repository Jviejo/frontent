import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGrupoComponent } from './form-grupo.component';

describe('FormGrupoComponent', () => {
  let component: FormGrupoComponent;
  let fixture: ComponentFixture<FormGrupoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormGrupoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
