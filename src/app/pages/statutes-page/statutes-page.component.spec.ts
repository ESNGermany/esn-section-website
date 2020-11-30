import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutesPageComponent } from './statutes-page.component';

describe('StatutesPageComponent', () => {
  let component: StatutesPageComponent;
  let fixture: ComponentFixture<StatutesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatutesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
