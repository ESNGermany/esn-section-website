import { TestBed } from '@angular/core/testing';

import { StatutesService } from './statutes.service';

describe('StatutesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatutesService = TestBed.get(StatutesService);
    expect(service).toBeTruthy();
  });
});
