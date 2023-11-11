import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpParams } from "@angular/common/http";
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { ActivatedRoute, NavigationExtras, ParamMap, Params, Router } from "@angular/router";

import { AggregationsSelection, Organization, Response, SearchResponse, SearchService } from "toco-lib";

import { OrgService } from "../_services/org.service";
import { ChartType } from "../charts/chart-utils";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class OrganizationSearchComponent implements OnInit,AfterViewInit
{
  /**
   * Represents the `ChartType` enum for internal use.
   */
  public readonly chartType: typeof ChartType;

  aggr_keys:Array<any>;
  search_type:Boolean = true;
  public currentChartType: ChartType;

  layoutPosition = [
    {
      name: "Derecha",
      layout: "row-reverse",
      aling: "center baseline",
      width: "22",
    },
    {
      name: "Izquierda",
      layout: "row",
      aling: "center baseline",
      width: "22",
    },
    {
      name: "Arriba",
      layout: "column",
      aling: "center center",
      width: "90",
    },
    {
      name: "Abajo",
      layout: "column-reverse",
      aling: "center center",
      width: "90",
    },
  ];
  currentlayout = this.layoutPosition[0];
  public changeLayoutPosition(index: number) {
    this.currentlayout = this.layoutPosition[index];
  }
  // end Layout stuff

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

  @ViewChild(MatDrawer) drawer: MatDrawer;

  public constructor(
    private _cuorService: OrgService,
    private activatedRoute: ActivatedRoute,
    private _searchService: SearchService,
    private router: Router)
  {
    this.chartType = ChartType;

    this.currentChartType = this.chartType.polar;
  }
    /* ****************************************************
    HIDE FILTERS ACCORDING TO VIEW SIZE
  **************************************************** */
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      // console.log("window:resize", window.innerWidth);
      if (this.drawer) {
        if (window.innerWidth <= 740) {
          this.drawer.opened = false;
        } else {
          this.drawer.opened = true;
        }
      }
    }
    ngAfterViewInit() {
      this.onResize(null);
    }

  public ngOnInit(): void {

    this.query = "";
    this.activatedRoute.queryParamMap.subscribe({
      next: (initQueryParams) => {
        this.defaultQueryParams(initQueryParams);
        this.aggrsSelection = {};

        for (let index = 0; index < initQueryParams.keys.length; index++) {
          const key = initQueryParams.keys[index];

          switch (key) {
            case "size":
              this.pageSize = Number.parseInt(initQueryParams.get(key));
              break;

            case "page":
              this.pageIndex = Number.parseInt(initQueryParams.get(key));
              break;

            case "q":
              this.query = initQueryParams.get(key);
              break;

            default:
              if (!this.aggrsSelection.hasOwnProperty(key)) {
                this.aggrsSelection[key] = [];
              }
              this.aggrsSelection[key].push(initQueryParams.get(key));
              break;
          }
        }

        this.aggrsSelection["country"] = ["Cuba"]; //porque aun si cambian la url arriba seguira diciendo cuba
        this.updateFetchParams();
        this.fetchSearchRequest();


      },

      error: (e) => {},

      complete: () => {},
    });
  }

  private defaultQueryParams(initQueryParams: ParamMap) {
    if (!initQueryParams.hasOwnProperty('q')) {
      this.query = '';
    }
    if (!initQueryParams.hasOwnProperty('size')) {
      this.pageSize = 5;
    }
    if (!initQueryParams.hasOwnProperty('page')) {
      this.pageIndex = 0;
    }
  }

  changeView(): void {
    this.search_type = !this.search_type
  }

  private updateFetchParams() {
    this.params = new HttpParams();

    this.params = this.params.set("size", this.pageSize.toString(10));

    this.params = this.params.set("page", (this.pageIndex + 1).toString(10));

    this.params = this.params.set("q", this.query);

    for (const aggrKey in this.aggrsSelection) {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        if (aggrKey != 'country'){
          this.params = this.params.set(aggrKey, bucketKey);
        }
      });
    }
    this.params = this.params.set("country", "Cuba");
  }

  public fetchSearchRequest() {
    this._cuorService.getOrganizations(this.params).subscribe(
      (response: SearchResponse<Organization>) => {

        // this.pageEvent.length = response.hits.total;
        this.sr = response;
        delete this.sr.aggregations["country"];
        this.aggr_keys = [
          //{value: this.sr.aggregations.country, key: 'País'},
          {value: this.sr.aggregations.state, key: 'Provincia'},
          {value: this.sr.aggregations.status, key: 'Estado'},
          {value: this.sr.aggregations.types, key: 'Tipo'},
        ]
      },
      (error: any) => {
        console.log("ERROPR");
      },
      () => {
        console.log("END...");
        this.loading = false;
      }
    );
  }

  public pageChange(event?: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateQueryParams();
  }

  public aggrChange(event/* ?: AggregationsSelection */): void {
    this.aggrsSelection = event;
    this.updateQueryParams();
  }

  queryChange(event?: string) {
    if(this.query != event){
      this.query = event;
      // this.aggrsSelection={}
      this.pageSize = 5;
      this.pageIndex = 0;
      this.updateQueryParams();
    }
  }

  private updateQueryParams() {

    this.loading = true;

    this.queryParams = {};

    this.queryParams["size"] = this.pageSize.toString(10);

    this.queryParams["page"] = this.pageIndex.toString(10);

    this.queryParams["q"] = this.query;

    for (const aggrKey in this.aggrsSelection) {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        this.queryParams[aggrKey] = bucketKey;
      });
    }
    this.navigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
      queryParamsHandling: "",
    };

    this.router.navigate(["."], this.navigationExtras);
  }


  moreKeyClick(event) {
    console.log(event);
    console.log(this.aggrsSelection);
    console.log(this.sr.aggregations);
    console.log(JSON.stringify(this.aggrsSelection));

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


}
