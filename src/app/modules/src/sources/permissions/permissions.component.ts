import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthStorage } from 'angular-oauth2-oidc';
import {
  Environment,
  Hit,
  Organization,
  OrganizationServiceNoAuth,
  Source,
  SourceService,
  Term,
} from 'toco-lib';
@Component({
  selector: 'catalog-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss'],
})
export class PermissionsComponent implements OnInit {
  asEditor: Array<Source>;
  asManager: Array<Source>;
  isAdmin = false;
  organizations: Hit<Organization>[];
  terms: Term[] = new Array<Term>();

  constructor(
    private sourceService: SourceService,
    private oauthStorage: OAuthStorage,
    private environment: Environment,
    private orgService: OrganizationServiceNoAuth,
    private activatedRoute: ActivatedRoute
  ) {}

  loading = true;

  private init(response) {
    this.asEditor = response.data.sources.editor;
    this.asManager = response.data.sources.manager;
    this.isAdmin = response.data.sources.admin;
    this.terms = response.data.sources.terms;
    this.organizations = response.data.sources.organizations;

    if (this.isAdmin) {
      // TODO: use cache!!!
      this.activatedRoute.data.subscribe({
        next: (data: { topOrganizationPID: string }) => {
          if (
            data &&
            data.topOrganizationPID &&
            data.topOrganizationPID != ''
          ) {
            this.orgService
              .getOrganizationByPID(data.topOrganizationPID)
              .subscribe({
                next: (response) => {
                  this.organizations = [response];
                },
                error: (error) => {},
                complete: () => {},
              });
          }
        },
        error: (e) => {
          console.log(e);
        },
        complete: () => {},
      });
    }
    this.loading = false;
  }

  ngOnInit() {
    this.sourceService.getMySourcesAllRoles().subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('mysources', JSON.stringify(response));
        this.loading = false;
        this.init(response);
      },
      error: (err: any) => {
        console.log('error: ' + err + '.');
      },
      complete: () => {
        console.log('complete');
      },
    });
    // if (localStorage.getItem('mysources') && localStorage.getItem('mysources') != '' ) {
    //   const response = JSON.parse(localStorage.getItem('mysources'));
    //   this.init(response);
    // } else {
    //   this.sourceService.getMySourcesAllRoles().subscribe(
    //     (response) => {
    //       console.log(response);
    //       localStorage.setItem('mysources', JSON.stringify(response));
    //       this.loading = false;
    //       this.init(response)
    //     },
    //     (err: any) => {
    //       console.log("error: " + err + ".");
    //     },
    //     () => {
    //       console.log("complete");
    //     }
    //   );
    // }
  }
}
