import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultSupplierComponent } from './consult-supplier.component';

describe('ConsultSupplierComponent', () => {
  let component: ConsultSupplierComponent;
  let fixture: ComponentFixture<ConsultSupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultSupplierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
