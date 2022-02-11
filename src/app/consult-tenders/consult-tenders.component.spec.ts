import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultTendersComponent } from './consult-tenders.component';

describe('ConsultTendersComponent', () => {
  let component: ConsultTendersComponent;
  let fixture: ComponentFixture<ConsultTendersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultTendersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
