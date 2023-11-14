import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SceibaUiOrgSearchDialogComponent } from './org-dialog.component';

describe('OrgDialogComponent', () => {
  let component: SceibaUiOrgSearchDialogComponent;
  let fixture: ComponentFixture<SceibaUiOrgSearchDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SceibaUiOrgSearchDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceibaUiOrgSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
