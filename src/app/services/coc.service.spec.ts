import { TestBed } from '@angular/core/testing';

import { CocService } from './coc.service';

describe('CocService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CocService = TestBed.get(CocService);
    expect(service).toBeTruthy();
  });
});
