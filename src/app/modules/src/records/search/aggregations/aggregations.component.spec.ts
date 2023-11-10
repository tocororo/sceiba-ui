import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RecordAggregationsComponent } from './aggregations.component';

describe('AggregationsComponent', () => {
  let component: RecordAggregationsComponent;
  let fixture: ComponentFixture<RecordAggregationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordAggregationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordAggregationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
