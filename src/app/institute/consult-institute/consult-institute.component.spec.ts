import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultInstituteComponent } from './consult-institute.component';

describe('ConsultInstituteComponent', () => {
  let component: ConsultInstituteComponent;
  let fixture: ComponentFixture<ConsultInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultInstituteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
