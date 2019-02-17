import { TestBed } from '@angular/core/testing';

import { InvEditService } from './inv-edit.service';

describe('InvEditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvEditService = TestBed.get(InvEditService);
    expect(service).toBeTruthy();
  });
});
