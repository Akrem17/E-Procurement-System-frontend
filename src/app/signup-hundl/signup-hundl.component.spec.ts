import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupHundlComponent } from './signup-hundl.component';

describe('SignupHundlComponent', () => {
  let component: SignupHundlComponent;
  let fixture: ComponentFixture<SignupHundlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupHundlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupHundlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
