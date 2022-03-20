import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OlaContentItemComponent } from './ola-content-item.component';

describe('OlaContentItemComponent', () => {
  let component: OlaContentItemComponent;
  let fixture: ComponentFixture<OlaContentItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OlaContentItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OlaContentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
