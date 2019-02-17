import { TestBed } from '@angular/core/testing';

import { NewSaleService } from './new-sale.service';

describe('NewSaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewSaleService = TestBed.get(NewSaleService);
    expect(service).toBeTruthy();
  });
});
