import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTenderClassificationComponent } from './edit-tender-classification.component';

describe('EditTenderClassificationComponent', () => {
  let component: EditTenderClassificationComponent;
  let fixture: ComponentFixture<EditTenderClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTenderClassificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTenderClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
