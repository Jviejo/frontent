import { TestBed, inject } from '@angular/core/testing';

import { S1Service } from './s1.service';

describe('S1Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [S1Service]
    });
  });

  it('should be created', inject([S1Service], (service: S1Service) => {
    expect(service).toBeTruthy();
  }));
});
