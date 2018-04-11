import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingCartItem } from './shopping-cart-item';

describe('CartComponent', () => {
  let component: ShoppingCartItem;
  let fixture: ComponentFixture<ShoppingCartItem>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCartItem ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCartItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
