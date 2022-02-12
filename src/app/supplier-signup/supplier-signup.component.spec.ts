import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSignupComponent } from './supplier-signup.component';

describe('SupplierSignupComponent', () => {
  let component: SupplierSignupComponent;
  let fixture: ComponentFixture<SupplierSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
