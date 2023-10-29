import { Component } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { MenuElement } from 'src/app/core/header/header.component';
import { Environment } from 'toco-lib';

@Component({
  selector: 'sceiba-ui-sources-root',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss'],
})
export class SourcesComponent {
  public _subMenus: MenuElement[];
  public extraUser: MenuElement[];

  constructor(private environment: Environment,private oauthStorage: OAuthStorage) {}
  ngOnInit(): void {

    this.extraUser = [
      {
        nameTranslate: 'CATALOG_PERMISSIONS',
        icon: 'vpn_key',
        href: this.environment.catalog + '/permissions',
        useRouterLink: true,
        disabled: this.notAuthenticated
      },
    ]


    this._subMenus = [
      {
        nameTranslate: 'HOME',
        useRouterLink: true,
        href: this.environment.catalog,
      },
      {
        nameTranslate: 'SCEIBA_CATALOGO',
        useRouterLink: true,
        href: this.environment.catalog + '/sources',
      },
      // {
      //   nameTranslate: 'REPORTS_STATISTICS',
      //   useRouterLink: true,
      //   href: this.environment.catalog + '/statistics',
      // },
    ];
  }

  public get notAuthenticated() : boolean {
    let request = JSON.parse(this.oauthStorage.getItem('user'));
    return request == (null || undefined);
  }
  ngOnDestroy(): void {}
}
