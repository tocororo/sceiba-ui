import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EvaluationViewComponent } from './evaluation-view.component';

describe('EvaluationViewComponent', () => {
  let component: EvaluationViewComponent;
  let fixture: ComponentFixture<EvaluationViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EvaluationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
