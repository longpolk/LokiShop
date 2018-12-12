import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherUpdateComponent } from './voucher-update.component';

describe('VoucherUpdateComponent', () => {
  let component: VoucherUpdateComponent;
  let fixture: ComponentFixture<VoucherUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
