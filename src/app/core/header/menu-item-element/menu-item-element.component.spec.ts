import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceibaUiMenuItemElementComponent } from './menu-item-element.component';

describe('MenuItemElementComponent', () => {
  let component: SceibaUiMenuItemElementComponent;
  let fixture: ComponentFixture<SceibaUiMenuItemElementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SceibaUiMenuItemElementComponent]
    });
    fixture = TestBed.createComponent(SceibaUiMenuItemElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
