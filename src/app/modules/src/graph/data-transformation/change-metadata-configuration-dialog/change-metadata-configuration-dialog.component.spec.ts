import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMetadataConfigurationDialogComponent } from './change-metadata-configuration-dialog.component';

describe('ChangeMetadataConfigurationDialogComponent', () => {
  let component: ChangeMetadataConfigurationDialogComponent;
  let fixture: ComponentFixture<ChangeMetadataConfigurationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMetadataConfigurationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeMetadataConfigurationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
