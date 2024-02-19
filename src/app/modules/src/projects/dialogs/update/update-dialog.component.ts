import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../../project/people.service";
import { Project } from "../../project/person.entity";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";

interface DialogData {
  project: Project;
  service: ProjectService;
}
@Component({
  selector: "update-dialog-form",
  templateUrl: "update-dialog.component.html",
  styleUrls: ["update-dialog.component.scss"],
  standalone: true,
  imports: [
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class UpdateDialogComponent implements OnInit {
  public projectForm = new FormControl("");
  public isLoading = false;
  public step = 0;
  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<UpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  ngOnInit() {
    this.isLoading = false;
    console.log(this.data.project);
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

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
