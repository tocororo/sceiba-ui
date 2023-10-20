import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResultAndRecomsComponent } from './survey-result-and-recoms.component';

describe('SurveyResultAndRecomsComponent', () => {
  let component: SurveyResultAndRecomsComponent;
  let fixture: ComponentFixture<SurveyResultAndRecomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyResultAndRecomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyResultAndRecomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
