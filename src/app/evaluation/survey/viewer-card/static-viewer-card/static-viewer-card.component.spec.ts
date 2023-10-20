import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaticViewerCardComponent } from './static-viewer-card.component';

describe('StaticViewerCardComponent', () => {
  let component: StaticViewerCardComponent;
  let fixture: ComponentFixture<StaticViewerCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticViewerCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticViewerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
