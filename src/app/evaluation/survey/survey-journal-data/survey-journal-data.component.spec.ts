import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SurveyJournalDataComponent } from './survey-journal-data.component';

describe('SurveyJournalDataComponent', () => {
  let component: SurveyJournalDataComponent;
  let fixture: ComponentFixture<SurveyJournalDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyJournalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyJournalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
