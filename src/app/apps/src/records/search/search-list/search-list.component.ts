import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from '@angular/router';
import { AggregationsSelection, Environment, HitList, Record } from 'toco-lib';

@Component({
  selector: 'search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss'],
})
export class RecordSearchListComponent implements OnInit {
  @Input()
  public hitList: HitList<Record>;
  @Input()
  public recordsPath: string = '';

  queryParams: Params;

  // begin paginator stuff
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 15, 25, 50, 100];
  // end paginator stuff

  query = '';
  aggrsSelection: AggregationsSelection = {};
  params: HttpParams;

  navigationExtras: NavigationExtras;
  public env: Environment;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _env: Environment
  ) {
    this.env = this._env;
  }

  public ngOnInit(): void {
    console.log(this.hitList);
    this.query = '';

    this.activatedRoute.queryParamMap.subscribe({
      next: (initQueryParams) => {
        this.aggrsSelection = {};

        for (let index = 0; index < initQueryParams.keys.length; index++) {
          const key = initQueryParams.keys[index];

          switch (key) {
            case 'size':
              this.pageSize = Number.parseInt(initQueryParams.get(key));
              break;

            case 'page':
              this.pageIndex = Number.parseInt(initQueryParams.get(key));
              break;

            case 'q':
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
        // this.fetchSearchRequest();
      },

      error: (e) => {},

      complete: () => {},
    });
  }

  private updateFetchParams() {
    this.params = new HttpParams();

    this.params = this.params.set('size', this.pageSize.toString(10));

    this.params = this.params.set('page', (this.pageIndex + 1).toString(10));

    this.params = this.params.set('q', this.query);

    for (const aggrKey in this.aggrsSelection) {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        this.params = this.params.set(aggrKey, bucketKey);
      });
    }
  }

  public updateQueryParams() {
    this.queryParams = {};

    this.queryParams['size'] = this.pageSize.toString(10);

    this.queryParams['page'] = this.pageIndex.toString(10);

    this.queryParams['q'] = this.query;

    for (const aggrKey in this.aggrsSelection) {
      this.aggrsSelection[aggrKey].forEach((bucketKey) => {
        this.queryParams[aggrKey] = bucketKey;
      });
    }
    this.navigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: this.queryParams,
      queryParamsHandling: '',
    };

    this.router.navigate(['.'], this.navigationExtras);
  }
}
