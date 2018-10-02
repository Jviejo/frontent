import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsimpleComponent } from './formsimple.component';

describe('FormsimpleComponent', () => {
  let component: FormsimpleComponent;
  let fixture: ComponentFixture<FormsimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
