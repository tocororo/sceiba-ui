import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CategoryTableComponent } from './category-table.component';

describe('CategoryTableComponent', () => {
  let component: CategoryTableComponent;
  let fixture: ComponentFixture<CategoryTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
