import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SceibaUiSearchSelectOrgComponent } from './org-dialog.component';

describe('OrgDialogComponent', () => {
  let component: SceibaUiSearchSelectOrgComponent;
  let fixture: ComponentFixture<SceibaUiSearchSelectOrgComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceibaUiSearchSelectOrgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceibaUiSearchSelectOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
