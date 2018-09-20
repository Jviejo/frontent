import { TestBed, inject } from '@angular/core/testing';

import { S2Service } from './s2.service';

describe('S2Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [S2Service]
    });
  });

  it('should be created', inject([S2Service], (service: S2Service) => {
    expect(service).toBeTruthy();
  }));
});
