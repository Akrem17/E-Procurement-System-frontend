import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSignupAddressComponent } from './supplier-signup-address.component';

describe('SupplierSignupAddressComponent', () => {
  let component: SupplierSignupAddressComponent;
  let fixture: ComponentFixture<SupplierSignupAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierSignupAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSignupAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
