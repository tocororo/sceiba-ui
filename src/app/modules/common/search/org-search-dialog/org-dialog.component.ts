import { HttpParams } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { NavigationExtras, Params } from '@angular/router';
import { OrgService } from '../../../src/persons/_services/org.service';

import {
  AggregationsSelection,
  Environment,
  Organization,
  Response,
  ResponseStatus,
  SearchResponse,
  SearchService,
} from 'toco-lib';

interface SceibaUiOrgSearchDialogComponentData {
  cuban: boolean;
  multiple: boolean;
}

// TODO: Importante. La logica para la seleccion multiple en este componente esta mal.
//       Cuando se pagina se pierde la lista de los elementos que estan seleccionados.
//
@Component({
  selector: 'sceiba-ui-search-select-org',
  templateUrl: './org-dialog.component.html',
  styleUrls: ['./org-dialog.component.scss'],
})
export class SceibaUiSearchSelectOrgComponent {
  aggr_keys: Array<any>;

  // begin paginator stuff
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5];
  // end paginator stuff

  query = '';
  aggrsSelection: AggregationsSelection = {};

  params: HttpParams;
  sr: SearchResponse<Organization>;
  queryParams: Params;
  navigationExtras: NavigationExtras;

  loading: boolean = true;
  selectedOrgs: Organization[] = [];

  @Output()
  selectedOrgEmiter: EventEmitter<Organization[]> = new EventEmitter<
    Organization[]
  >();

  @Input()
  multipleSelection: boolean = false;

  @Input()
  showTitle: boolean = true;

  @Input()
  filterCuban: boolean = true;

  @Input()
  showActions: boolean = true;

  header: string = 'SELECT_ORGANIZATION';

  @ViewChild(MatDrawer) drawer: MatDrawer;

  public env: Environment;
  public constructor(
    private _env: Environment,
    private _cuorService: OrgService,
    private _searchService: SearchService // @Inject(MAT_DIALOG_DATA) public data: SceibaUiOrgSearchDialogComponentData
  ) {
    this.env = this._env;
  }

  public ngOnInit(): void {
    this.query = '';
    if (this.filterCuban) {
      this.aggrsSelection['country'] = ['Cuba'];
    }

    this.doSearch();
  }

  public doSearch() {
    this.updateFetchParams();
    this.fetchSearchRequest();
  }

  private updateFetchParams() {
    this.params = new HttpParams();

    this.params = this.params.set('size', this.pageSize.toString(10));

    this.params = this.params.set('page', (this.pageIndex + 1).toString(10));

    this.params = this.params.set('q', this.query);

    if (this.filterCuban) {
      for (const aggrKey in this.aggrsSelection) {
        this.aggrsSelection[aggrKey].forEach((bucketKey) => {
          if (aggrKey != 'country') {
            this.params = this.params.set(aggrKey, bucketKey);
          }
        });
      }
      this.params = this.params.set('country', 'Cuba');
    } else {
      for (const aggrKey in this.aggrsSelection) {
        this.aggrsSelection[aggrKey].forEach((bucketKey) => {
          this.params = this.params.set(aggrKey, bucketKey);
        });
      }
    }
  }

  private fetchSearchRequest() {
    this._cuorService.getOrganizations(this.params).subscribe({
      next: (response: SearchResponse<Organization>) => {
        // this.pageEvent.length = response.hits.total;
        this.sr = response;

        this.aggr_keys = [
          { value: this.sr.aggregations.country, key: 'País' },
          { value: this.sr.aggregations.state, key: 'Provincia' },
          { value: this.sr.aggregations.status, key: 'Estado' },
          { value: this.sr.aggregations.types, key: 'Tipo' },
        ];
        if (this.filterCuban) {
          this.sr.aggregations.country['disabled'] = true;
        }
      },
      error: (error: any) => {},
      complete: () => {
        this.loading = false;
      },
    });
  }

  private defaultPage() {
    this.pageSize = 5;
    this.pageIndex = 0;
  }
  public pageChange(event?: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.doSearch();
  }

  public aggrChange(event /* ?: AggregationsSelection */): void {
    this.aggrsSelection = event;
    this.defaultPage();
    this.doSearch();
  }

  queryChange(event?: string) {
    this.query = event;
    this.defaultPage();
    this.doSearch();
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
        if (response.status == ResponseStatus.SUCCESS) {
          let buckets = response.data.terms;
          this.sr.aggregations[event].buckets = buckets;
        }
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


  isSelected(org: Organization){
    return this.selectedOrgs.find((o) => o.id == org.id);
  }
  currentPageSelectionChange(event) {
    let aux: Organization[] = [];
    this.selectedOrgs.forEach(element => {
      if (!this.sr.hits.hits.find((hit) => hit.id == element.id)){
        aux.push(element)
      }
    });
    this.sr.hits.hits
    event.source.selectedOptions.selected.forEach((element) => {
      aux.push(element.value);
    });
    this.selectedOrgs = aux;

    this.selectedOrgEmiter.emit(this.selectedOrgs);
  }

  // checkMultiple(e, org: Organization) {
  //   if (!this.selectedOrgs) {
  //     this.selectedOrgs = [];
  //   }

  //   if (e.checked === true) {
  //     this.selectedOrgs.push(org);
  //   }

  //   if (e.checked === false) {
  //     this.selectedOrgs = this.selectedOrgs.filter((ele) => ele.id !== org.id);
  //   }
  //   console.log('multiple: ', this.selectedOrgs);

  //   this.selectedOrgEmiter.emit(this.selectedOrgs);
  // }

  // checkSingle(e, org: Organization) {
  //   this.selectedOrgs = [];

  //   if ((e.checked = true)) {
  //     this.selectedOrgs.push(org);
  //   }
  //   console.log('sigle: ', this.selectedOrgs);
  //   this.selectedOrgEmiter.emit(this.selectedOrgs);
  // }

  // checkOrganization(e, org: Organization) {
  //   if (this.multipleSelection) {
  //     this.checkMultiple(e, org);
  //   } else {
  //     this.checkSingle(e, org);
  //   }
  // }

  // isSelected(org: Organization) {
  //   if (this.selectedOrgs) {
  //     this.selectedOrgs.forEach((element) => {
  //       if (element.id == org.id) {
  //         console.log("selected: ", org);

  //         return true;
  //       }
  //     });
  //   }
  //   return false;
  // }
}
