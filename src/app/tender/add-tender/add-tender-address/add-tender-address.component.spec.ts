import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenderAddressComponent } from './add-tender-address.component';

describe('AddTenderAddressComponent', () => {
  let component: AddTenderAddressComponent;
  let fixture: ComponentFixture<AddTenderAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTenderAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenderAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
