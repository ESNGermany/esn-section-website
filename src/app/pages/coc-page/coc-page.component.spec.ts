import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CocPageComponent } from './coc-page.component';

describe('CocPageComponent', () => {
  let component: CocPageComponent;
  let fixture: ComponentFixture<CocPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CocPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CocPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
