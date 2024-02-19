import { HttpParams } from "@angular/common/http";
import { Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from "@angular/router";
import {
  AggregationsComponent,
  AggregationsSelection,
  SearchResponse,
} from "toco-lib";
import { ProjectService } from "../project/people.service";
import { Project } from "../project/person.entity";

/**
 * Represents a component that shows the result of a search based on aggregations.
 * The search result can be showed as a list or charts.
 */
@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  providers: [AggregationsComponent],
})
export class SearchComponent implements OnInit {
  /**
   * Represents the `QueryParamKey` enum for internal use.
   */
  // public readonly queryParamKey: typeof QueryParamKey;

  // /**
  //  * Represents the `ChartType` enum for internal use.
  //  */
  public readonly chartType: any;

  /**
   * Indicates the search result type.
   * Its value is true if the search result is showed as a list.
   * Its value is false if the search result is showed as charts.
   * By default, its value is `true`.
   */
  public searchResultType: boolean;
  public aggrKeys: Array<any>;
  // public currentChartType: ChartType;
  public gradient = true;
  public colorScheme = {
    domain: ["#95EC00", "#00C322", "#FF1300", "D2006B"],
  };
  public view = window.innerWidth <= 740 ? [350, 200] : [700, 400];
  public single = [];
  public pageSize: number;
  public pageIndex: number;
  public pageSizeOptions: number[];

  public query: string;
  public aggrsSelection: AggregationsSelection;
  public drawerMode: string;
  /**
   * The search that was requested as an HTTP request/response body that represents serialized parameters.
   */
  private params: HttpParams;
  /**
   * Represents the response of the search.
   */
  public sr: SearchResponse<Project>;
  private navigationExtras: NavigationExtras;

  public loading: boolean;

  @ViewChild(MatDrawer)
  public drawer: MatDrawer;

  public constructor(
    private peopleService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.searchResultType = true; /* The search result is showed as a list. */
    this.aggrKeys = undefined;
    if (window.innerWidth <= 740) {
      this.drawerMode = "over";
    } else {
      this.drawerMode = "side";
    }

    this.pageSize = 5;
    this.pageIndex = 0;
    this.pageSizeOptions = [5, 15, 25, 50, 100];

    this.query = "";
    this.aggrsSelection = {};

    this.params = undefined;
    this.sr = undefined;
    this.navigationExtras = undefined;

    this.loading = true;

    this.activatedRoute.queryParamMap.subscribe({
      next: (initQueryParams) => {
        this.aggrsSelection = {};
        console.log(initQueryParams);

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

        this.updateFetchParams();
        this.fetchSearchRequested();
      },

      error: (e) => {},

      complete: () => {},
    });
  }

  /**
   * Returns the search result type.
   * Its value is true if the search result is showed as a list.
   * Its value is false if the search result is showed as charts.
   * By default, its value is `true`.
   */
  // public get searchResultType(): boolean {
  //     return this._searchResultType;
  // }

  /**
   * Toggles the view that is used to show the search result.
   * If it changes to true, then the search result is showed as a list.
   * If it changes to false, then the search result is showed as charts.
   */
  public changeView(): void {
    this.searchResultType = !this.searchResultType;
  }

  /**
   * Updates the `params` that will be used to fetch the search.
   */
  private updateFetchParams(): void {
    this.params = new HttpParams();

    this.params = this.params.set("size", this.pageSize.toString());

    this.params = this.params.set("page", (this.pageIndex + 1).toString());

    this.params = this.params.set("q", this.query);
    for (const aggrKey in this
      .aggrsSelection) /* this.queryParamKey.aggrsSel */ {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        this.params = this.params.set(aggrKey, bucketKey);
      });
    }
  }

  /**
   * Fetches the search that was requested using the `_params`.
   */
  private fetchSearchRequested(): void {
    this.peopleService.getProjects(this.params).subscribe(
      (response: SearchResponse<Project>) => {
        this.sr = response;
        console.log(this.sr);
        this.aggrKeys = [
          {
            value: this.sr.aggregations.founder,
            key: "Subvencionista",
            name: "Subvencionista",
            sp: "Subvencionista",
          },
          {
            value: this.sr.aggregations.creator,
            key: "Creador",
            name: "Creador",
            sp: "Creador",
          },
        ];
        this.single[0] = this.sr.aggregations.creator.buckets.map((buck) => {
          return {
            name: buck.key,
            value: buck.doc_count,
          };
        });
        this.single[1] = this.sr.aggregations.founder.buckets.map((buck) => {
          return {
            name: buck.key,
            value: buck.doc_count,
          };
        });
      },

      (error: any) => {
        console.log("Error in `_fetchSearchRequested` method.");
      },

      () => {
        console.log("Finish the `_fetchSearchRequested` method.");
        this.loading = false;
      }
    );
  }

  public pageChange(event?: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updateQueryParams();
  }

  public aggrChange(event /* ?: AggregationsSelection */): void {
    this.aggrsSelection = event;
    this.updateQueryParams();
  }

  public queryChange(event?: string): void {
    this.query = event;
    this.updateQueryParams();
  }

  private updateQueryParams(): void {
    this.loading = true;

    let queryParams: Params = {};

    queryParams["size"] = this.pageSize.toString(10);

    queryParams["page"] = this.pageIndex.toString(10);

    queryParams["q"] = this.query;

    for (const aggrKey in this
      .aggrsSelection) /* this.queryParamKey.aggrsSel */ {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        queryParams[aggrKey] = bucketKey;
      });
    }

    this.navigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: queryParams,
      queryParamsHandling: "",
    };

    this.router.navigate(["."], this.navigationExtras);
  }

  //TODO: What does this code do?
  @HostListener("window:resize", ["$event"])
  public onResize(event: Event): void {
    // console.log("window:resize", window.innerWidth);
    if (window.innerWidth <= 740) {
      this.drawerMode = "over";
      this.view = [350, 200];
    } else {
      this.drawerMode = "side";
      this.view = [700, 400];
    }
  }
}
