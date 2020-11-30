import { TestBed } from '@angular/core/testing';

import { ImprintService } from './imprint.service';

describe('ImprintService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImprintService = TestBed.get(ImprintService);
    expect(service).toBeTruthy();
  });
});
