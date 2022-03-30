import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOfferComponent } from './consult-offer.component';

describe('ConsultOfferComponent', () => {
  let component: ConsultOfferComponent;
  let fixture: ComponentFixture<ConsultOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
