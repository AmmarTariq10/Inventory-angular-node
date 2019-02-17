import { TestBed } from '@angular/core/testing';

import { InvAddService } from './inv-add.service';

describe('InvAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvAddService = TestBed.get(InvAddService);
    expect(service).toBeTruthy();
  });
});
