import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierSignupRepresentativeComponent } from './supplier-signup-representative.component';

describe('SupplierSignupRepresentativeComponent', () => {
  let component: SupplierSignupRepresentativeComponent;
  let fixture: ComponentFixture<SupplierSignupRepresentativeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierSignupRepresentativeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierSignupRepresentativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
