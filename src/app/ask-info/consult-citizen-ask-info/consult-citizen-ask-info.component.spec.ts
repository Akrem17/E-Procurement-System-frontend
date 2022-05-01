import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultCitizenAskInfoComponent } from './consult-citizen-ask-info.component';

describe('ConsultCitizenAskInfoComponent', () => {
  let component: ConsultCitizenAskInfoComponent;
  let fixture: ComponentFixture<ConsultCitizenAskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultCitizenAskInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultCitizenAskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
