import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageNotFoundEvaluationComponent } from './page-not-found-evaluation.component';

describe('PageNotFoundEvaluationComponent', () => {
  let component: PageNotFoundEvaluationComponent;
  let fixture: ComponentFixture<PageNotFoundEvaluationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundEvaluationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
