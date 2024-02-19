import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryResultDetailComponent } from './query-result-detail.component';

describe('QueryResultDetailComponent', () => {
  let component: QueryResultDetailComponent;
  let fixture: ComponentFixture<QueryResultDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryResultDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryResultDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
