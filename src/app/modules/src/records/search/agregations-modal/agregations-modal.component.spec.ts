import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregationsModalComponent } from './agregations-modal.component';

describe('AgregationsModalComponent', () => {
  let component: AgregationsModalComponent;
  let fixture: ComponentFixture<AgregationsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgregationsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregationsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
