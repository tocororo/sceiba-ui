import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SceibaUiFooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: SceibaUiFooterComponent;
  let fixture: ComponentFixture<SceibaUiFooterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceibaUiFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceibaUiFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
