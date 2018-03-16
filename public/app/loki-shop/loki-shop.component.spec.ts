import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LokiShopComponent } from './loki-shop.component';

describe('LokiShopComponent', () => {
  let component: LokiShopComponent;
  let fixture: ComponentFixture<LokiShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LokiShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LokiShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
