import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceViewDefaultComponent } from './source-view-default.component';

describe('SourceViewDefaultComponent', () => {
  let component: SourceViewDefaultComponent;
  let fixture: ComponentFixture<SourceViewDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceViewDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceViewDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
