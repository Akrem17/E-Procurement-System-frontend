import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteSignupAddressComponent } from './institute-signup-address.component';

describe('InstituteSignupAddressComponent', () => {
  let component: InstituteSignupAddressComponent;
  let fixture: ComponentFixture<InstituteSignupAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteSignupAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteSignupAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
