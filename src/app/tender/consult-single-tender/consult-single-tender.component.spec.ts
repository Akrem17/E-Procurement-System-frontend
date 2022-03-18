import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultSingleTenderComponent } from './consult-single-tender.component';

describe('ConsultSingleTenderComponent', () => {
  let component: ConsultSingleTenderComponent;
  let fixture: ComponentFixture<ConsultSingleTenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultSingleTenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultSingleTenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
