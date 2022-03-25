import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenderSpecificationsComponent } from './add-tender-specifications.component';

describe('AddTenderSpecificationsComponent', () => {
  let component: AddTenderSpecificationsComponent;
  let fixture: ComponentFixture<AddTenderSpecificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTenderSpecificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenderSpecificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
