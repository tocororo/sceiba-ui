
import { HttpParams } from "@angular/common/http";
import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import { ActivatedRoute, NavigationExtras, Params, Router } from "@angular/router";

import { isMinWindows, isMobile, isMobileBrowser } from "src/app/modules/common/is-mobile";
import { AggregationsSelection, Response, ResponseStatus, SearchResponse, SearchService } from "toco-lib";
import { PeopleService } from "../people/people.service";
import { Person } from "../people/person.entity";


/**
 * Represents a component that shows the result of a search based on aggregations.
 * The search result can be showed as a list or charts.
 */
@Component({
    selector: "persons-app-search",
    templateUrl: "./search.component.html",
    styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit,  AfterViewInit  {
    /**
     * Represents the `QueryParamKey` enum for internal use.
     */
    // public readonly queryParamKey: typeof QueryParamKey;

    // /**
    //  * Represents the `ChartType` enum for internal use.
    //  */
    // public readonly chartType: typeof ChartType;

    /**
     * Indicates the search result type.
     * Its value is true if the search result is showed as a list.
     * Its value is false if the search result is showed as charts.
     * By default, its value is `true`.
     */
    public searchResultType: boolean;
    public aggrKeys: Array<any>;
    // public currentChartType: ChartType;

    public pageSize: number;
    public pageIndex: number;
    public pageSizeOptions: number[];

    public query: string;
    public aggrsSelection: AggregationsSelection;

    /**
     * The search that was requested as an HTTP request/response body that represents serialized parameters.
     */
    private params: HttpParams;
    /**
     * Represents the response of the search.
     */
    public sr: SearchResponse<Person>;
    private navigationExtras: NavigationExtras;

    public loading: boolean;

    @ViewChild(MatDrawer)
    public drawer: MatDrawer;
  /* ****************************************************
    HIDE FILTERS ACCORDING TO VIEW SIZE
  **************************************************** */
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      // console.log("window:resize", window.innerWidth);
      if (this.drawer) {
        this.drawer.mode = isMobile() ? 'over' : 'side';
        if(!isMobileBrowser()){
          this.drawer.opened = !isMinWindows();
        }

      }
    }
    ngAfterViewInit() {
      this.onResize(null);
    }

    public constructor(
        private peopleService: PeopleService,
        private activatedRoute: ActivatedRoute,
        private _searchService: SearchService,
        private router: Router) {

    }

    public ngOnInit(): void {
        this.searchResultType = true;  /* The search result is showed as a list. */
        this.aggrKeys = undefined;
        // this.currentChartType = this.chartType.polar;

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

            error: (e) => { },

            complete: () => { },
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

        this.params = this.params.set("size", this.pageSize.toString(10));

        this.params = this.params.set("page", (this.pageIndex + 1).toString(10));

        this.params = this.params.set("q", this.query);
        for (const aggrKey in this.aggrsSelection)  /* this.queryParamKey.aggrsSel */ {
            this.aggrsSelection[aggrKey].forEach((bucketKey) => {
                this.params = this.params.set(aggrKey, bucketKey);
            });
        }
    }

    /**
     * Fetches the search that was requested using the `_params`.
     */
    private fetchSearchRequested(): void {
        this.peopleService.getPeople(this.params).subscribe(
            (response: SearchResponse<Person>) => {
                console.log('fetchSearchRequested', response);

                // this.pageEvent.length = response.hits.total;
                this.sr = response;

                //TODO: Implement it in another way; this must be done in a generic form.
                // Los valores 'País', 'Provincia', etc. deben ser obtenidos genéricamente.
                this.aggrKeys = [
                    { value: this.sr.aggregations.country, key: 'País' },
                    { value: this.sr.aggregations.state, key: 'Provincia' },
                    { value: this.sr.aggregations.status, key: 'Estado' },
                    { value: this.sr.aggregations.types, key: 'Tipo' },
                ]
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

    public aggrChange(event/* ?: AggregationsSelection */): void {
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

        for (const aggrKey in this.aggrsSelection)  /* this.queryParamKey.aggrsSel */ {
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


  moreKeyClick(event) {
    let start = this.sr.aggregations[event].buckets.length;
    let size = this.sr.hits.total;
    let filters = [];
    for (const aggrKey in this.aggrsSelection) {
      filters.push({ key: aggrKey, value: this.aggrsSelection[aggrKey] });
    }
    let _query = {
      index: 'organizations',
      filters: filters,
      agg: {
        filter: event,
        size: start + 5,
      },
    };
    this._searchService.getAggregationTerms(_query).subscribe({
      next: (response: Response<any>) => {
        if (response.status == ResponseStatus.SUCCESS) {
          let buckets = response.data.terms;
          this.sr.aggregations[event].buckets = buckets;
        }
      },
      error: (error) => {},
      complete: () => {},
    });
  }
}
