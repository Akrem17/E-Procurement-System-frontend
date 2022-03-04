import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenSignupComponent } from './citizen-signup.component';

describe('CitizenSignupComponent', () => {
  let component: CitizenSignupComponent;
  let fixture: ComponentFixture<CitizenSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitizenSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
