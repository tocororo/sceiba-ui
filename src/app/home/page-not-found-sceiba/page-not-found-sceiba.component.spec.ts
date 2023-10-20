import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PageNotFoundSceibaComponent } from './page-not-found-sceiba.component';

describe('PageNotFoundSceibaComponent', () => {
  let component: PageNotFoundSceibaComponent;
  let fixture: ComponentFixture<PageNotFoundSceibaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNotFoundSceibaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNotFoundSceibaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
