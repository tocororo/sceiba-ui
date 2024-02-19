import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../../project/people.service";
import { Project } from "../../project/person.entity";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TocoSnackbarComponent } from "../../toco-snackbar/toco-snackbar.component";

interface DialogData {
  project: Project;
  service: ProjectService;
}
@Component({
  selector: "dialog-overview-example-dialog",
  templateUrl: "delete-dialog.component.html",
  styleUrls: ["delete-dialog.component.scss"],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
  ],
})
export class DeleteDialogComponent implements OnInit {
  public isLoading = false;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  ngOnInit() {
    this.isLoading = false;
    console.log(this.isLoading);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onAccept(): void {
    this.isLoading = !this.isLoading;
    this.data.service.deleteProject(this.data.project.id).subscribe((data) => {
      this.isLoading = !this.isLoading;
      this.onNoClick();
      const snackBarRef = this._snackBar.openFromComponent(
        TocoSnackbarComponent,
        {
          data: {
            message: "Proyecto Eliminado",
            action: "Hecho",
          },
          duration: 3000,
        }
      );
      snackBarRef.afterDismissed().subscribe((data) => {
        this.router.navigate(["/"]);
      });
    });
  }
}
