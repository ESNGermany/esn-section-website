import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingsPageComponent } from './incomings-page.component';

describe('IncomingsPageComponent', () => {
  let component: IncomingsPageComponent;
  let fixture: ComponentFixture<IncomingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
