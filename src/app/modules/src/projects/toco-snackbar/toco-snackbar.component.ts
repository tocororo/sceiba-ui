import { Component, Inject } from "@angular/core";
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";

interface TocoSnackbarData {
  message: string;
  action: string;
}
@Component({
  selector: "your-snackbar",
  templateUrl: "toco-snackbar.component.html",
  styleUrls: ["toco-snackbar.component.scss"],
  imports: [MatButtonModule],
  standalone: true,
})
export class TocoSnackbarComponent {
  constructor(
    public snackbarRef: MatSnackBarRef<TocoSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: TocoSnackbarData
  ) {}

  onClick() {
    this.snackbarRef.dismiss();
  }
}
