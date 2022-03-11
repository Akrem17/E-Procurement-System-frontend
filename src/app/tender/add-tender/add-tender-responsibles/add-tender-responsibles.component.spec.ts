import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTenderResponsiblesComponent } from './add-tender-responsibles.component';

describe('AddTenderResponsiblesComponent', () => {
  let component: AddTenderResponsiblesComponent;
  let fixture: ComponentFixture<AddTenderResponsiblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTenderResponsiblesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTenderResponsiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
