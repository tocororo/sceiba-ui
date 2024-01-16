import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataTransformationComponent } from '../data-transformation.component';

@Component({
  selector: 'app-change-metadata-configuration-dialog',
  templateUrl: './change-metadata-configuration-dialog.component.html',
  styleUrls: ['./change-metadata-configuration-dialog.component.scss']
})
export class ChangeMetadataConfigurationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChangeMetadataConfigurationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DataTransformationComponent,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    
  }
}
