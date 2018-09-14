import { TestBed, inject } from '@angular/core/testing';

import { ServicioService } from './servicio.service';

describe('ServicioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServicioService]
    });
  });

  it('should be created', inject([ServicioService], (service: ServicioService) => {
    expect(service).toBeTruthy();
  }));
});
