import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectivaComponent } from './directiva.component';

describe('DirectivaComponent', () => {
  let component: DirectivaComponent;
  let fixture: ComponentFixture<DirectivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
