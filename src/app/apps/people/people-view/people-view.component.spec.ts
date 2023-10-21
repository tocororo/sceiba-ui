import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PeopleViewComponent } from './people-view.component';

describe('PeopleViewComponent', () => {
  let component: PeopleViewComponent;
  let fixture: ComponentFixture<PeopleViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
