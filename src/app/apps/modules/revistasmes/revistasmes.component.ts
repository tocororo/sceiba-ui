/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { OAuthService, OAuthStorage } from "angular-oauth2-oidc";
import { MenuElement } from "src/app/core/header/header.component";
import {
  Environment,
  OauthAuthenticationService
} from "toco-lib";

@Component({
  selector: "seiba-ui-revistasmes-root",
  templateUrl: "./revistasmes.component.html",
  styleUrls: ["./revistasmes.component.scss"],
})
export class RevistasMesComponent {



  public _subMenus: MenuElement[];
  loading = false;


  constructor(
    private environment: Environment,
    private oauthStorage: OAuthStorage,
    private oauthService: OAuthService,
    private authenticateService: OauthAuthenticationService,
    private router: Router,
    private _transServ: TranslateService
  ) {
    let env: any = this.environment;
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        }

        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.loading = false;
        }
      },
      (error: any) => {},
      () => {}
    );

    this._subMenus = [
      {
        nameTranslate: 'HOME',
        useRouterLink: true,
        href: this.environment.revistasmes,
      },
      {
        nameTranslate: 'REVISTAS_MES_DIRECTORY',
        useRouterLink: true,
        href: this.environment.revistasmes + '/sources',
      },
      {
        nameTranslate: 'REVISTAS_MES_INCLUDE_JOURNAL',
        useRouterLink: true,
        href: this.environment.revistasmes + '/sources/new/journal',
        disabled: this.notAuthenticated,
      },
      {
        nameTranslate: 'REVISTAS_MES_MY_SOURCES',
        icon: 'key',
        useRouterLink: true,
        hideLabel: true,
        href: `${this.environment.revistasmes}/permissions`,
        disabled: this.notAuthenticated,
      },
    ];


  }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  public get notAuthenticated() : boolean {
    let request = JSON.parse(this.oauthStorage.getItem('user'));
    return request == (null || undefined);
  }
}
