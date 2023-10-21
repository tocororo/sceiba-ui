import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRevistasmesComponent } from './home.component';

describe('HomeRevistasmesComponent', () => {
  let component: HomeRevistasmesComponent;
  let fixture: ComponentFixture<HomeRevistasmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRevistasmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRevistasmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
