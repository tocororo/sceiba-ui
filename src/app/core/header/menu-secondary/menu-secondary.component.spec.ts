import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSecondaryComponent } from './menu-secondary.component';

describe('MenuSecondaryComponent', () => {
  let component: MenuSecondaryComponent;
  let fixture: ComponentFixture<MenuSecondaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuSecondaryComponent]
    });
    fixture = TestBed.createComponent(MenuSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
