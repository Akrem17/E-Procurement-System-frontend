import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TendersOfInstituteComponent } from './tenders-of-institute.component';

describe('TendersOfInstituteComponent', () => {
  let component: TendersOfInstituteComponent;
  let fixture: ComponentFixture<TendersOfInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TendersOfInstituteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TendersOfInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
