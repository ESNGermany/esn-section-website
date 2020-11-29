import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsncardPageComponent } from './esncard-page.component';

describe('EsncardPageComponent', () => {
  let component: EsncardPageComponent;
  let fixture: ComponentFixture<EsncardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsncardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsncardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
