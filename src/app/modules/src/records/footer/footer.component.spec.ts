import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SceibaFooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: SceibaFooterComponent;
  let fixture: ComponentFixture<SceibaFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceibaFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceibaFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
