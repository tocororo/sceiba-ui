import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  HostListener,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  ActivatedRoute,
  NavigationExtras,
  ParamMap,
  Params,
  Router,
  convertToParamMap,
} from '@angular/router';
import {
  Environment,
  FilterHttpMap,
  Hit,
  HitList,
  JournalData,
  JournalVersion,
  MessageHandler,
  MetadataService,
  Organization,
  OrganizationServiceNoAuth,
  Source,
  SourceServiceNoAuth,
  StatusCode,
} from 'toco-lib';
import { CatalogFilterKeys } from './filters/filters.component';

@Component({
  selector: 'catalog-search',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
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
export class CatalogComponent implements OnInit, AfterViewInit {
  // journalList: Journal[] = [];
  loading = true;
  initfilters = false;
  private hasErrors = false;
  dataSource = new HitList<Source>();
  columnsToDisplay = ['title']; //, "url"];
  expandedElement: Source;
  length = 0;
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageEvent: PageEvent;
  params: Array<FilterHttpMap>;
  filtersParams: ParamMap;

  layoutPosition = [
    {
      name: 'Derecha',
      layout: 'row-reverse',
      aling: 'center baseline',
      width: '22',
    },
    {
      name: 'Izquierda',
      layout: 'row',
      aling: 'center baseline',
      width: '22',
    },
    {
      name: 'Arriba',
      layout: 'column',
      aling: 'center center',
      width: '90',
    },
    {
      name: 'Abajo',
      layout: 'column-reverse',
      aling: 'center center',
      width: '90',
    },
  ];
  currentlayout = this.layoutPosition[1];

  searchParams: HttpParams;

  public topOrganizationPID = null;
  public topMainOrganization: Hit<Organization> = null;
  public catalogPath = "";
  @Input() public usetopMainOrganization = false;

  @ViewChild(MatDrawer) drawer: MatDrawer;
  constructor(
    private sourceServiceNoAuth: SourceServiceNoAuth,
    private metadata: MetadataService,
    private environment: Environment,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private orgService: OrganizationServiceNoAuth,
    private router: Router
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
  /* ****************************************************
    end HIDE FILTERS ACCORDING TO VIEW SIZE
  **************************************************** */
  ngOnInit() {
    let path = this.router.url.split('?');
    if(path.length > 0){
      this.catalogPath = path[0];
    }

    this.activatedRoute.data.subscribe({
      next: (data: { topOrganizationPID: string }) => {
        if (data && data.topOrganizationPID && data.topOrganizationPID != '') {
          this.topOrganizationPID = data.topOrganizationPID;
          if (
            localStorage.getItem('topMainOrganization') &&
            localStorage.getItem('topMainOrganization') != ''
          ) {
            const response = JSON.parse(
              localStorage.getItem('topMainOrganization')
            );
            this.topMainOrganization = response;
            this.init();
          } else {
            this.orgService
              .getOrganizationByPID(this.topOrganizationPID)
              .subscribe({
                next: (response) => {
                  this.topMainOrganization = response;
                  localStorage.setItem(
                    'topMainOrganization',
                    JSON.stringify(response)
                  );
                  this.init();
                },

                error: (error) => {
                  console.log('ERROR', error);
                },

                complete: () => {},
              });
          }
        } else {
          this.init();
        }
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {},
    });
  }

  init() {
    this.metadata.setStandardMeta('Catálogo de Revistas Científicas', '', '');
    // this.paginator.firstPage();
    // this.paginator.pageSize = 5;
    this.searchParams = new HttpParams();
    this.activatedRoute.queryParamMap.subscribe({
      next: (params) => {
        this.filtersParams = params;
        // this.searchParams = this.searchParams.set('size', this.pageSize.toString(10));
        // this.searchParams = this.searchParams.set('page', this.pageIndex.toString(10));
        if (params.has('size')) {
          // this.pageSize = Number.parseInt(params.get("size"), 10);
          this.searchParams = this.searchParams.set('size', params.get('size'));
        } else {
          this.searchParams = this.searchParams.set(
            'size',
            this.pageSize.toString(10)
          );
        }
        if (params.has('page')) {
          // this.pageIndex = Number.parseInt(params.get("page"), 10);
          this.searchParams = this.searchParams.set('page', params.get('page'));
        } else {
          this.searchParams = this.searchParams.set(
            'page',
            (this.pageIndex + 1).toString(10)
          );
        }

        // if (params.has(CatalogFilterKeys.source_status)) {
        //   this.searchParams = this.searchParams.set(
        //     CatalogFilterKeys.source_status,
        //     params.get(CatalogFilterKeys.source_status)
        //   );
        // }
        if (params.has(CatalogFilterKeys.source_type)) {
          this.searchParams = this.searchParams.set(
            CatalogFilterKeys.source_type,
            params.get(CatalogFilterKeys.source_type)
          );
        } else {
          this.searchParams = this.searchParams.delete(
            CatalogFilterKeys.source_type
          );
        }
        // TODO: this is not nice, but..
        let query = '';

        if (params.has(CatalogFilterKeys.title)) {
          query = query.concat(params.get(CatalogFilterKeys.title));
        }

        if (this.topMainOrganization) {
          if (query != '') {
            query = this.queryAddAndOp(query);
          }
          query = query.concat(
            '(organizations.id:' + this.topMainOrganization.id + ')'
          );
        }

        if (params.has(CatalogFilterKeys.institutions)) {
          query = this.queryAddAndOp(query);
          query = query.concat('(organizations.id:');
          params
            .get(CatalogFilterKeys.institutions)
            .split(',')
            .forEach((uuid, index, array) => {
              query = query.concat(uuid);
              if (index < array.length - 1) {
                query = query.concat(' OR ');
              }
            });
          query = query.concat(')');
        }
        if (params.has(CatalogFilterKeys.subjects)) {
          query = this.queryAddAndOp(query);
          query = query.concat('(classifications.id:');
          params
            .get(CatalogFilterKeys.subjects)
            .split(',')
            .forEach((uuid, index, array) => {
              query = query.concat(uuid);
              if (index < array.length - 1) {
                query = query.concat(' OR ');
              }
            });
          query = query.concat(')');
        }
        if (params.has(CatalogFilterKeys.grupo_mes)) {
          query = this.queryAddAndOp(query);
          query = query.concat('(classifications.id:');
          params
            .get(CatalogFilterKeys.grupo_mes)
            .split(',')
            .forEach((uuid, index, array) => {
              query = query.concat(uuid);
              if (index < array.length - 1) {
                query = query.concat(' OR ');
              }
            });
          query = query.concat(')');
        }
        if (params.has(CatalogFilterKeys.indexes)) {
          query = this.queryAddAndOp(query);
          query = query.concat('(classifications.id:');
          params
            .get(CatalogFilterKeys.indexes)
            .split(',')
            .forEach((uuid, index, array) => {
              query = query.concat(uuid);
              if (index < array.length - 1) {
                query = query.concat(' OR ');
              }
            });
          query = query.concat(')');
        }

        this.searchParams = this.searchParams.set('q', query);
        console.log(this.searchParams, 'SEARCH PAAAAAARAMS');

        this.fetchJournalData();
        this.initfilters = true;

        console.log('catalog comonent', params, this.filtersParams);
      },
      error: (e) => {},
      complete: () => {},
    });
  }

  private queryAddAndOp(query) {
    if (query != '') {
      return query + ' AND ';
    }
    return query;
  }
  ngOnChanges() {
    console.log('change');
  }

  filtersChange(values: Params) {
    this.filtersParams = convertToParamMap(values);

    // console.log(this.filtersParams);
    console.log(values);
    console.log(this.router.url);
    values['page'] = this.pageIndex + 1;
    values['size'] = this.pageSize;

    let navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: values,
      queryParamsHandling: '',
      replaceUrl: true,
    };
    this.router.navigate(['.'], navigationExtras);
    // this.paginator.firstPage();
  }

  pageChange(event?: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    const navigationExtras: NavigationExtras = {
      relativeTo: this.activatedRoute,
      queryParams: { page: event.pageIndex + 1, size: event.pageSize },
      queryParamsHandling: 'merge',
    };

    this.router.navigate(['.'], navigationExtras);
  }

  public fetchJournalData() {
    this.loading = true;
    this.sourceServiceNoAuth.getSources(this.searchParams).subscribe(
      (values) => {
        this.length = values.hits.total;
        this.dataSource = values.hits;
        // const arr = new Array<Source>();
        // values.hits.hits.forEach((item) => {
        //   console.log(item,);
        //   const j = new Source();
        //   j.deepcopy(item.metadata);
        //   j.uuid = item.metadata["source_uuid"];
        //   j.data.deepcopy(item.metadata);
        //   j.id = item.id;
        //   console.log(j);

        //   arr.push(j);
        // });
        // this.dataSource.data = arr;
        console.log(
          '------------------------------------------',
          this.dataSource
        );
      },
      (err: any) => {
        console.log('error: ' + err + '.');
      },
      () => {
        console.log('complete');
        this.loading = false;
      }
    );
  }

  public onScrollUp() {
    // console.log("scrolled up!!");
  }
  // public isEmpty() {
  //   if (this.dataSource.data.length === 0 && this.hasErrors) {
  //     //this.loading = false;
  //     return true;
  //   }
  //   return false;
  // }

  public isLoading() {
    return this.loading;
  }

  public openme(): boolean {
    const a = navigator.userAgent.match(/Android/i);
    const b = navigator.userAgent.match(/BlackBerry/i);
    const apple = navigator.userAgent.match(/iPhone|iPad|iPod/i);
    const o = navigator.userAgent.match(/Opera Mini/i);
    const i = navigator.userAgent.match(/IEMobile/i);
    if (a != null || b != null || apple != null || o != null || i != null) {
      return false;
    }
    return true;
  }

  public changeLayoutPosition(index: number) {
    this.currentlayout = this.layoutPosition[index];
  }

  viewJournal(uuid: string): void {
    this.sourceServiceNoAuth.getSourceByUUID(uuid).subscribe(
      (response: Hit<JournalData>) => {
        console.log(response);
        if (response) {
          let journalVersion = new JournalVersion();

          journalVersion.data.deepcopy(response.metadata);
          journalVersion.id = uuid;
          const dialogRef = this.dialog.open(DialogCatalogJournalInfoDialog, {
            data: {
              journalVersion: journalVersion,
            },
          });

          dialogRef.afterClosed();
        } else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(
            StatusCode.serverError,
            'No fue posible encontrar la Revista'
          );
        }
      },
      (error) => {
        console.log('error');
      },
      () => {}
    );
  }
}

@Component({
  selector: 'dialog-catalog-journal-info',
  template: `
    <mat-dialog-content class="height-auto">
      <catalog-source-view-version-info
        [sourceVersion]="data.journalVersion"
        [showVersionLabel]="false"
      >
      </catalog-source-view-version-info>
    </mat-dialog-content>
  `,
})
export class DialogCatalogJournalInfoDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogCatalogJournalInfoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
