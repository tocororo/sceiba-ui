import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaticChipsLinkComponent } from './chips-static-link.component';

describe('StaticChipsLinkComponent', () => {
  let component: StaticChipsLinkComponent;
  let fixture: ComponentFixture<StaticChipsLinkComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaticChipsLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaticChipsLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
