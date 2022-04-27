import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultInstituteAskInfoComponent } from './consult-institute-ask-info.component';

describe('ConsultInstituteAskInfoComponent', () => {
  let component: ConsultInstituteAskInfoComponent;
  let fixture: ComponentFixture<ConsultInstituteAskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultInstituteAskInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultInstituteAskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
