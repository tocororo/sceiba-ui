import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceibaUiSearchAggregationsComponent } from './aggregations.component';

describe('SearchAggregationsComponent', () => {
  let component: SceibaUiSearchAggregationsComponent;
  let fixture: ComponentFixture<SceibaUiSearchAggregationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceibaUiSearchAggregationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceibaUiSearchAggregationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
