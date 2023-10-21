import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { EvaluationService } from "../evaluationService.service";
import { Evaluations } from "../survey/evaluation.entity";

@Component({
  selector: "app-evaluation-view",
  templateUrl: "./evaluation-view.component.html",
  styleUrls: ["./evaluation-view.component.scss"],
})
export class EvaluationViewComponent implements OnInit {
  public evaluationData: Evaluations;
  public step: number;

  constructor(
    private evaluationService: EvaluationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getEvaluationById(params["uuid"]);
    });
  }

  public getEvaluationById(uuid: string) {
    this.evaluationService
      .getEvaluationsById(uuid)
      .subscribe(({ data: { evaluation } }: Evaluations) => {
        this.evaluationData = evaluation;
        this.evaluationData.data.sections = evaluation.data.sections.map(
          (section, i) => ({
            ...section,
            evaluation:
              this.evaluationData.data.resultAndRecoms.sections[i]
                .titleEvaluationValue,
            categories: section.categories.map((cat, j) => ({
              ...cat,
              evaluation:
                this.evaluationData.data.resultAndRecoms.sections[i].categories[
                  j
                ].titleEvaluationValue,
              ...(this.evaluationData.data.resultAndRecoms.sections[i]
                .categories[j].questionsOrRecoms.length > 0 && {
                recomendations:
                  this.evaluationData.data.resultAndRecoms.sections[i]
                    .categories[j].questionsOrRecoms,
              }),
            })),
          })
        );
      });
  }

  public setStep(index: number) {
    this.step = index;
  }

}
