import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewerCardComponent } from './viewer-card.component';

describe('ViewerCardComponent', () => {
  let component: ViewerCardComponent;
  let fixture: ComponentFixture<ViewerCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
