import { Component, OnInit, ViewChild } from "@angular/core";

import { EvaluationService } from "../_services/evaluationService.service";
import { Evaluations } from "../survey/evaluation.entity";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Environment } from "toco-lib";

@Component({
  selector: "app-my-evaluation",
  templateUrl: "./my-evaluation.component.html",
  styleUrls: ["./my-evaluation.component.scss"],
})
export class MyEvaluationComponent implements OnInit {

  displayedColumns: string[] = ["name", "type", "methodology", "date", "state", "options"];
  // List evaluations
  dataSource: MatTableDataSource<Evaluations[]>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  public env: Environment;
  public constructor(
    private _env: Environment,
    private evaluationService: EvaluationService,
    private router: Router
  ) {
    this.env = this._env;
  }

  ngOnInit() {
    this.getEvaluations();
  }

  public changeDate(date: Date) {
    let objectDate = new Date(date);

    const day = objectDate.getDate();
    const month = objectDate.getMonth();
    const year = objectDate.getFullYear();

    const dateformat = day + "/" + month + "/" + year;

    return dateformat;
  }

  public getEvaluations() {
    this.evaluationService
      .getUserEvaluations()
      .subscribe(({data}: any) => {
        this.dataSource = new MatTableDataSource(data.evaluations.map((item) => ({
          ...item,
          datetime: this.changeDate(item.datetime),
        })));
      });
  }


  public editEvaluation(uuid: string) {
    this.evaluationService
      .getEvaluationsById(uuid)
      .subscribe(({ data: { evaluation } }: Evaluations) => {
        console.log("data===", evaluation);

        this.router.navigate(["/survey/" + evaluation.uuid + "/add"]);
      });
  }

  public cloneEvaluation(uuid: string) {
    this.evaluationService
      .cloneEvaluation(uuid)
      .subscribe(({ data: { evaluation } }: Evaluations) => {
        console.log("data===", evaluation);

        this.router.navigate(["/survey/" + evaluation.uuid + "/add"]);
      });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
