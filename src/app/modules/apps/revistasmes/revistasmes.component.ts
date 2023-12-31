/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { HeaderService } from 'src/app/core/header.service';
import { MenuElement } from 'src/app/core/header/header.component';
import { Environment, USER_STORAGE_VAR } from 'toco-lib';

@Component({
  selector: 'seiba-ui-revistasmes-root',
  templateUrl: './revistasmes.component.html',
  styleUrls: ['./revistasmes.component.scss'],
})
export class RevistasMesComponent {
  public _subMenus: MenuElement[];
  loading = false;

  public env: Environment;
  constructor(
    private environment: Environment,
    private oauthStorage: OAuthStorage,
    private router: Router,
    private headerService: HeaderService
  ) {
    this.env = this.environment;
    this.router.events.subscribe({
      next: (event) => {
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
      error: () => {},
      complete: () => {},
    });

    this._subMenus = [
      // {
      //   nameTranslate: 'HOME',
      //   useRouterLink: true,
      //   href: this.environment.revistasmes,
      // },
      {
        nameTranslate: 'REVISTAS_MES_DIRECTORY',
        useRouterLink: true,
        href: this.environment.revistasmes + '/directory',
      },
      {
        nameTranslate: 'REVISTAS_MES_INCLUDE_JOURNAL',
        useRouterLink: true,
        href: this.environment.revistasmes + '/directory/new/journal',
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

    let data = {
      icon: '/assets/icons/apps/revistasmes.png',
      iconLabel: 'REVISTAS_MES',
      iconAlt: 'REVISTAS_MES',
      iconRoute: this.env.revistasmes,
      secondaryMenuElements: this._subMenus,
      extraMenuAuthenticatedUser: null,
    };
    this.headerService.setHeaderData(data);
  }
  ngOnInit(): void {}

  ngOnDestroy(): void {}

  public get notAuthenticated(): boolean {
    let request = JSON.parse(this.oauthStorage.getItem(USER_STORAGE_VAR));
    return request == (null || undefined);
  }
}
