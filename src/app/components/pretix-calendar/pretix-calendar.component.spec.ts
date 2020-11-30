import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretixCalendarComponent } from './pretix-calendar.component';

describe('PretixCalendarComponent', () => {
  let component: PretixCalendarComponent;
  let fixture: ComponentFixture<PretixCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretixCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretixCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
