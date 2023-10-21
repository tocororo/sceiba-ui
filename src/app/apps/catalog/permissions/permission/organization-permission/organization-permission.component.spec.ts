import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySourcesOrganizationPermissionComponent } from './organization-permission.component';

describe('OrganizationPermissionComponent', () => {
  let component: MySourcesOrganizationPermissionComponent;
  let fixture: ComponentFixture<MySourcesOrganizationPermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySourcesOrganizationPermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySourcesOrganizationPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
