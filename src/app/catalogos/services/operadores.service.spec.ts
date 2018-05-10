import { TestBed, inject } from '@angular/core/testing';

import { OperadoresService } from './operadores.service';

describe('OperadoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperadoresService]
    });
  });

  it('should be created', inject([OperadoresService], (service: OperadoresService) => {
    expect(service).toBeTruthy();
  }));
});
