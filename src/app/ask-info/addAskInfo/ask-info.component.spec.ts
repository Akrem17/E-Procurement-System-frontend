import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskInfoComponent } from './ask-info.component';

describe('AskInfoComponent', () => {
  let component: AskInfoComponent;
  let fixture: ComponentFixture<AskInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
