import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferClassificationCardComponent } from './offer-classification-card.component';

describe('OfferClassificationCardComponent', () => {
  let component: OfferClassificationCardComponent;
  let fixture: ComponentFixture<OfferClassificationCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferClassificationCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferClassificationCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
