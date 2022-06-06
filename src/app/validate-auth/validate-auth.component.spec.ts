import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateAUTHComponent } from './validate-auth.component';

describe('ValidateAUTHComponent', () => {
  let component: ValidateAUTHComponent;
  let fixture: ComponentFixture<ValidateAUTHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidateAUTHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateAUTHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
