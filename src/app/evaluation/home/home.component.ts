import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { EvaluationService } from "../evaluationService.service";

import { MatSnackBar } from "@angular/material";
import {
  ActionText, MessageHandler, MetadataService, StatusCode
} from "toco-lib";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  /**
   * Represents the `ActionText` enum for internal use.
   */
  public readonly actionText: typeof ActionText;
  hasTaskInProgress = false;
  public constructor(
    private _activatedRoute: ActivatedRoute,
    private EvaluationService: EvaluationService,
    public transServ: TranslateService,
    private _metadata: MetadataService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    this.actionText = ActionText;
  }

  public ngOnInit(): void {
    this._activatedRoute.url.subscribe(() => {
      this._metadata.meta.updateTag({
        name: "DC.title",
        content: "Autoevaluación de Revistas Científicas Universitarias",
      });
      this._metadata.meta.updateTag({
        name: "DC.description",
        content:
          "Control de calidad y monitoreo de las publicaciones científicas a nivel nacional e institucional con el objetivo de aumentar la visibilidad de las publicaciones científicas de los sistemas de educación superior cubano y peruano",
      });
    });
  }

  public createEvaluation() {
    this.hasTaskInProgress = true;
    this.EvaluationService.createEvaluation().subscribe({
      next: (result: any) => {
        this.hasTaskInProgress = false;
        const uuid = result.data.evaluation.uuid
        this.router.navigate(['survey', uuid, this.actionText.add])
      },
      error: (err: any) => {
        const m = new MessageHandler(this._snackBar);
        m.showMessage(StatusCode.OK, err.message);
      },
    });
  }
}
