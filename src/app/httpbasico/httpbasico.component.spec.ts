import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpbasicoComponent } from './httpbasico.component';

describe('HttpbasicoComponent', () => {
  let component: HttpbasicoComponent;
  let fixture: ComponentFixture<HttpbasicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpbasicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HttpbasicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
