import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceibaUiBreadcrumbsComponent } from './sceiba-ui-breadcrumbs.component';

describe('SceibaUiBreadcrumbsComponent', () => {
  let component: SceibaUiBreadcrumbsComponent;
  let fixture: ComponentFixture<SceibaUiBreadcrumbsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceibaUiBreadcrumbsComponent]
    });
    fixture = TestBed.createComponent(SceibaUiBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
