import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenderClassificationsComponent } from './add-tender-classifications.component';

describe('AddTenderClassificationsComponent', () => {
  let component: AddTenderClassificationsComponent;
  let fixture: ComponentFixture<AddTenderClassificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTenderClassificationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenderClassificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
