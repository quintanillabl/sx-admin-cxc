import { TestBed, inject } from '@angular/core/testing';

import { ChequeDevueltoService } from './cheque-devuelto.service';

describe('ChequeDevueltoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChequeDevueltoService]
    });
  });

  it('should be created', inject([ChequeDevueltoService], (service: ChequeDevueltoService) => {
    expect(service).toBeTruthy();
  }));
});
