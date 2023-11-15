import { HttpParams } from "@angular/common/http";
import {
  Component,
  Inject,
  ViewChild
} from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import {
  NavigationExtras,
  Params
} from "@angular/router";
import { OrgService } from "../../../src/persons/_services/org.service";

import { AggregationsSelection, Environment, Organization, Response, SearchResponse, SearchService } from "toco-lib";

interface SceibaUiOrgSearchDialogComponentData{
  cuban: boolean;
  multiple: boolean;
}

@Component({
  selector: "sceiba-ui-org-search-dialog",
  templateUrl: "./org-dialog.component.html",
  styleUrls: ["./org-dialog.component.scss"],
})
export class SceibaUiOrgSearchDialogComponent {
  aggr_keys: Array<any>;

  // begin paginator stuff
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 15, 25, 50, 100];
  // end paginator stuff

  query = "";
  aggrsSelection: AggregationsSelection = {};

  params: HttpParams;
  sr: SearchResponse<Organization>;
  queryParams: Params;
  navigationExtras: NavigationExtras;

  loading: boolean = true;
  selectedOrgs: any;

  multipleSelection: boolean = false;
  header: string = 'SELECT_ORGANIZATION';

  @ViewChild(MatDrawer) drawer: MatDrawer;

  public env: Environment;
  public constructor(
    private _env: Environment,
    private _cuorService: OrgService,
    public dialogRef: MatDialogRef<SceibaUiOrgSearchDialogComponent>,
    private _searchService: SearchService,
    @Inject(MAT_DIALOG_DATA) public data: SceibaUiOrgSearchDialogComponentData
  ) {this.env = this._env;}

  public ngOnInit(): void {

    this.query = "";
    this.multipleSelection = this.data.multiple;
    if(this.data.cuban){
      this.aggrsSelection["country"] = ["Cuba"];
    }

    this.updateFetchParams();
    this.fetchSearchRequest();
  }

  private updateFetchParams() {
    this.params = new HttpParams();

    this.params = this.params.set("size", this.pageSize.toString(10));

    this.params = this.params.set("page", (this.pageIndex + 1).toString(10));

    this.params = this.params.set("q", this.query);

    for (const aggrKey in this.aggrsSelection) {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        if (aggrKey != "country") {
          this.params = this.params.set(aggrKey, bucketKey);
        }
      });
    }
    this.params = this.params.set("country", "Cuba");
  }

  public fetchSearchRequest() {
    this._cuorService.getOrganizations(this.params).subscribe({
      next: (response: SearchResponse<Organization>) => {
        // this.pageEvent.length = response.hits.total;
        this.sr = response;

        this.aggr_keys = [
          {value: this.sr.aggregations.country, key: 'País'},
          { value: this.sr.aggregations.state, key: "Provincia" },
          { value: this.sr.aggregations.status, key: "Estado" },
          { value: this.sr.aggregations.types, key: "Tipo" },
        ];
        if(this.data.cuban){
          this.sr.aggregations.country['disabled'] = true;
        }
      },
      error: (error: any) => {
        console.log("ERROPR");
      },
      complete: () => {
        console.log("END...");
        this.loading = false;
      }
    });
  }

  public pageChange(event?: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  public aggrChange(event /* ?: AggregationsSelection */): void {
    this.aggrsSelection = event;
  }

  queryChange(event?: string) {
    this.query = event;
  }

  moreKeyClick(event) {
    let start = this.sr.aggregations[event].buckets.length;
    let size = this.sr.hits.total;
    let filters = [];
    for (const aggrKey in this.aggrsSelection) {
      console.log(aggrKey);

      filters.push({ key: aggrKey, value: this.aggrsSelection[aggrKey] });
    }
    console.log(filters);

    let _query = {
      index: 'organizations',
      filters: filters,
      agg: {
        filter: event,
        size: start + 5,
      },
    };
    console.log(JSON.stringify(_query));
    this._searchService.getAggregationTerms(_query).subscribe({
      next: (response: Response<any>) => {
        console.log(response.data['terms']);

        let buckets = response.data.terms;
        console.log(buckets);
        console.log(this.sr.aggregations[event].buckets);

        this.sr.aggregations[event].buckets = buckets;
      },
      error: (error) => {},
      complete: () => {},
    });
  }

  // @HostListener("window:resize", ["$event"])
  // onResize(event: Event) {
  //   // console.log("window:resize", window.innerWidth);
  //   if (window.innerWidth <= 740) {
  //     this.drawer.opened = false;
  //   } else {
  //     this.drawer.opened = true;
  //   }
  // }

  onNoClick(): void {
    this.dialogRef.close();

  }

  checkMultiple(e, org) {
    if (!this.selectedOrgs) {
      this.selectedOrgs = [];
    }

    if (e.checked === true) {
      this.selectedOrgs.push(org);
    }

    if (e.checked === false) {
      this.selectedOrgs = this.selectedOrgs.filter((ele) => ele.id !== org.id);
    }

    console.log(this.selectedOrgs);
  }

  checkSingle(e, org) {
    this.selectedOrgs = org;
  }
}