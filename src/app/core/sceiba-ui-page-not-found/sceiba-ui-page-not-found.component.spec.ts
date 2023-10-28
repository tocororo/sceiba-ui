import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceibaUiPageNotFoundComponent } from './sceiba-ui-page-not-found.component';

describe('SceibaUiPageNotFoundComponent', () => {
  let component: SceibaUiPageNotFoundComponent;
  let fixture: ComponentFixture<SceibaUiPageNotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceibaUiPageNotFoundComponent]
    });
    fixture = TestBed.createComponent(SceibaUiPageNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
