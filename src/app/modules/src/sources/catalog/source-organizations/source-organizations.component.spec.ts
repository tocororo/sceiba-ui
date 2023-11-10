import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceEditOrganizationsComponent } from './source-organizations.component';

describe('SourceOrganizationsComponent', () => {
  let component: SourceEditOrganizationsComponent;
  let fixture: ComponentFixture<SourceEditOrganizationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourceEditOrganizationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourceEditOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
