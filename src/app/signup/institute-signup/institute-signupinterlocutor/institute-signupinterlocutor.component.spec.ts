import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstituteSignupinterlocutorComponent } from './institute-signupinterlocutor.component';

describe('InstituteSignupinterlocutorComponent', () => {
  let component: InstituteSignupinterlocutorComponent;
  let fixture: ComponentFixture<InstituteSignupinterlocutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstituteSignupinterlocutorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstituteSignupinterlocutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
