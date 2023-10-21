import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySourcesOrganizationsComponent } from './organizations.component';

describe('MySourcesOrganizationsComponent', () => {
  let component: MySourcesOrganizationsComponent;
  let fixture: ComponentFixture<MySourcesOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySourcesOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySourcesOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
