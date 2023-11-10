import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpParams } from "@angular/common/http";
import { AfterViewInit, Component, EventEmitter, HostListener, OnInit, Output, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import { MatDrawer } from "@angular/material/sidenav";
import {
  ActivatedRoute,
  NavigationExtras,
  Params, Router
} from "@angular/router";
import { AggregationsSelection, MetadataService, Record, SearchResponse, SearchService } from "toco-lib";
import { RecordsAgregationsModalComponent } from "../agregations-modal/agregations-modal.component";

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
export class RecordSearchComponent implements OnInit, AfterViewInit {

  agregations_selected_in_modal: any[];
  aggr_keys:Array<any>
  search_type:Boolean = true
  typeChart: "Polar Chart" | "Vertical Bar" | /* "Pie Grid" | */ "Gauge Chart"= "Polar Chart"

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

  query :string= "";
  aggrsSelection: AggregationsSelection = {};

  params: HttpParams;
  @Output()
  key_to_open_modal = new EventEmitter<string>();

  sr: SearchResponse<Record>;
  queryParams: Params;
  navigationExtras: NavigationExtras;

  loading: boolean = true;

  @ViewChild(MatDrawer, { static: false }) drawer: MatDrawer;
  public recordsPath = "";

  public constructor(
    private dialog: MatDialog,

    private _searchService: SearchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private metadata: MetadataService,

    // private dialog: MatDialog
  ) {}

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

    let path = this.router.url.split('?');
    if(path.length > 0){
      this.recordsPath = path[0];
    }

    this.activatedRoute.url.subscribe( () =>{

      })

    this.activatedRoute.queryParamMap.subscribe({
      next: (initQueryParams) => {
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
              this.updateMetas(this.query);
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
        this.fetchSearchRequest();


      },

      error: (e) => {},

      complete: () => {},
    });
  }

  changeView(): void {
    this.search_type = !this.search_type;
  }

  private updateFetchParams() {
    this.params = new HttpParams();

    this.params = this.params.set("size", this.pageSize.toString(10));

    this.params = this.params.set("page", (this.pageIndex + 1).toString(10));

    this.params = this.params.set("q", this.query);

    for (const aggrKey in this.aggrsSelection) {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        this.params = this.params.set(aggrKey, bucketKey);
      });
    }
  }

  public fetchSearchRequest() {
    this._searchService.getRecords(this.params).subscribe(
      (response: SearchResponse<Record>) => {

        // this.pageEvent.length = response.hits.total;
        this.sr = response;


        this.aggr_keys = [
          {value: this.sr.aggregations.creators, key: 'Creadores'},
          {value: this.sr.aggregations.keywords, key: 'Palabras Claves'},
          {value: this.sr.aggregations.sources, key: 'Fuentes'},
          {value: this.sr.aggregations.terms, key: 'Términos'},
        ]
        this.sr.aggregations.creators['label'] = 'Autores';
        this.sr.aggregations.keywords['label'] = 'Palabras Clave';
        this.sr.aggregations.sources['label'] = 'Fuentes';
        this.sr.aggregations.terms['label'] = 'Términos';

        console.log(this.sr)
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
    this.query = event;
    this.aggrsSelection={}
    this.updateQueryParams();

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

  public updateMetas(query:string){
    this.metadata.meta.updateTag({name:"DC.title", content:"Búsqueda de publicaciones científicas cubanas"});
    this.metadata.meta.updateTag({name:"DC.description", content:query});
  }


   /**
   * this method receives the child event and open the modal dialog by sending
   * him the data to be displayed,when closing the modal he saves the result in a variable
   * and then performs the search with those agregations
   * @param event the event recibed from the click that is made on the toco-search-agregations component
   * represent the key ,depending on the key,the respective agregations are shown
   */
   openAggModal(event: any) {
    let agg_array = [];
    this.key_to_open_modal.emit(event);
    console.log(event)
    console.log(event.key);

    const dialogRef = this.dialog.open(RecordsAgregationsModalComponent, {width:"50%",
      data: this.sr.aggregations[event.key].buckets,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result != undefined) {
        console.log("r", result);

        result.forEach((agregation: any, index: number) => {
          agg_array.push(agregation.key);
        });
        this.aggrsSelection={}
        this.aggrsSelection[event.key] = agg_array;

        console.log("agg", this.aggrsSelection);
        this.updateQueryParams()

      }
    });
  }

}
