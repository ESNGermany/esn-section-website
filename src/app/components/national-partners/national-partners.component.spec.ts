import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalPartnersComponent } from './national-partners.component';

describe('NationalPartnersComponent', () => {
  let component: NationalPartnersComponent;
  let fixture: ComponentFixture<NationalPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NationalPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NationalPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
