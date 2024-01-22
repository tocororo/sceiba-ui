import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryOutputComponent } from './query-output.component';

describe('QueryOutputComponent', () => {
  let component: QueryOutputComponent;
  let fixture: ComponentFixture<QueryOutputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryOutputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
