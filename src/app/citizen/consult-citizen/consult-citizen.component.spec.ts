import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultCitizenComponent } from './consult-citizen.component';

describe('ConsultCitizenComponent', () => {
  let component: ConsultCitizenComponent;
  let fixture: ComponentFixture<ConsultCitizenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultCitizenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultCitizenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
