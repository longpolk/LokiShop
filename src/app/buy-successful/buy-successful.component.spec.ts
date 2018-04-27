import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySuccessfulComponent } from './buy-successful.component';

describe('BuySuccessfulComponent', () => {
  let component: BuySuccessfulComponent;
  let fixture: ComponentFixture<BuySuccessfulComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySuccessfulComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySuccessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
