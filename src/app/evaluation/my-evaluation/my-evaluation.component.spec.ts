import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MyEvaluationComponent } from './my-evaluation.component';

describe('MyEvaluationComponent', () => {
  let component: MyEvaluationComponent;
  let fixture: ComponentFixture<MyEvaluationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
