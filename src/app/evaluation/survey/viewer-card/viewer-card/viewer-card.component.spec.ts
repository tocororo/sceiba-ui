import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerCardComponent } from './viewer-card.component';

describe('ViewerCardComponent', () => {
  let component: ViewerCardComponent;
  let fixture: ComponentFixture<ViewerCardComponent>;

  beforeEach(async(() => {
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
