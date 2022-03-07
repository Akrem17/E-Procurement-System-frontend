import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSignupLicenceComponent } from './supplier-signup-licence.component';

describe('SupplierSignupLicenceComponent', () => {
  let component: SupplierSignupLicenceComponent;
  let fixture: ComponentFixture<SupplierSignupLicenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierSignupLicenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSignupLicenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
