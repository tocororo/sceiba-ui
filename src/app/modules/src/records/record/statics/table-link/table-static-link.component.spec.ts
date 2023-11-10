import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaticTableLinkComponent } from './table-static-link.component';

describe('StaticTableComponent', () => {
  let component: StaticTableLinkComponent;
  let fixture: ComponentFixture<StaticTableLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticTableLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticTableLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
