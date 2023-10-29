/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OAuthStorage } from "angular-oauth2-oidc";

import {
  Environment,
  Hit,
  Journal,
  Organization,
  OrganizationServiceNoAuth,
  ResponseStatus,
  SourceService,
  SourceServiceNoAuth,
  SourceTypes,
} from "toco-lib";

@Component({
  selector: "revistasmes-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeRevistasmesComponent implements OnInit {
  public topOrganizationPID: string = "orgaid.223";
  public topMainOrganization: Hit<Organization> = null;

  public institutionsCount: number;

  public records: number;

  public sourcesCount: number;

  public lastSources: Array<Journal>;

  public stats = null;
  public error = false;
  public env: Environment;

  constructor(
    private environment: Environment,
    private sourceService: SourceService,
    private oauthStorage: OAuthStorage,
    private sourceServiceNoAuth: SourceServiceNoAuth,
    private orgService: OrganizationServiceNoAuth,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {this.env = this.environment;}

  ngOnInit() {
    // console.log(this.environment.topOrganizationPID)
    // if (this.environment.topOrganizationPID) {
    // this.topOrganizationPID = this.environment.topOrganizationPID;
    if (
      localStorage.getItem("topMainOrganization") &&
      localStorage.getItem("topMainOrganization") != ""
    ) {
      const response = JSON.parse(localStorage.getItem("topMainOrganization"));
      this.topMainOrganization = response;
      // new Organization();
      // this.topMainOrganization.deepcopy(response.metadata);
      this.init();
    } else {
      this.orgService.getOrganizationByPID(this.topOrganizationPID).subscribe(
        (response) => {
          // console.log(response)
          this.topMainOrganization = response;
          // new Organization();
          // this.topMainOrganization.deepcopy(response.metadata);
          localStorage.setItem("topMainOrganization", JSON.stringify(response));
          this.init();
        },
        (error) => {
          console.log("error");
          this.error = true;
        },
        () => {}
      );
    }
    // }
    this.institutionsCount = 0;
    this.records = 0;
    this.sourcesCount = 0;

    this.lastSources = new Array();

    // this.catalogService.getSourcesOrgAggregation(this.topOrganizationPID).subscribe(
    //     response => {
    //         if (response && response.data && response.data.home_statics) {
    //           console.log(response)

    //             // this.institutionsCount = response.data.home_statics.institutions_count;

    //             // this.records = response.data.home_statics.records;

    //             // this.sourcesCount = response.data.home_statics.soources_count;

    //             // response.data.home_statics.last_sources.forEach( (j: Journal) => {
    //             //     let jl = new Journal();
    //             //     jl.deepcopy(j);
    //             //     this.lastSources.push( jl );
    //             // });

    //         }
    //         console.log(response);

    //       },
    //       (error: any) => {},
    //       () => {}
    // );
  }

  init() {
    this.sourceServiceNoAuth
      .getSourcesStats(this.topMainOrganization.id)
      .subscribe(
        (response) => {
          if (response && response.status == ResponseStatus.SUCCESS) {
            this.stats = response.data.aggr;
            let types = [];
            this.stats.source_types.forEach((element) => {
              if (element.source_type == SourceTypes.JOURNAL.value) {
                element["label"] = SourceTypes.JOURNAL.label;
                types.push(element);
              }
              if (element.source_type == SourceTypes.STUDENT.value) {
                element["label"] = SourceTypes.STUDENT.label;
                types.push(element);
              }
              if (element.source_type == SourceTypes.POPULARIZATION.value) {
                element["label"] = SourceTypes.POPULARIZATION.label;
                types.push(element);
              }
            });
            this.stats.source_types = types;
            console.log(this.stats);
          }
        },
        (err: any) => {
          console.log("error: " + err + ".");
          this.error = true;
        },
        () => {
          console.log("complete");
        }
      );
  }
  // TODO: replace viewJournal for route, no modal dialog
  // viewJournal(uuid: string): void {
  //     this.sourceServiceNoAuth.getSourceByUUID(uuid).subscribe(
  //       response => {
  //         console.log(response);
  //         if (response.metadata) {
  //           let journalVersion = new JournalVersion();
  //           journalVersion.data.deepcopy(response.metadata);
  //           journalVersion.source_uuid = response.id;
  //           const dialogRef = this.dialog.open(DialogCatalogJournalInfoDialog, {
  //             data: {
  //               journalVersion: journalVersion,
  //               journalUUID: uuid
  //             }
  //           });

  //           dialogRef.afterClosed();
  //         } else {
  //           const m = new MessageHandler(this._snackBar);
  //           m.showMessage(
  //             StatusCode.serverError,
  //             "No fue posible encontrar la Revista"
  //           );
  //         }
  //       },
  //       error => {
  //         console.log("error");
  //         error = true;
  //       },
  //       () => {}
  //     );
  //   }
}
