import { TestBed } from '@angular/core/testing';

import { NationalPartnersService } from './national-partners.service';

describe('NationalPartnersService', () => {
  let service: NationalPartnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NationalPartnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
