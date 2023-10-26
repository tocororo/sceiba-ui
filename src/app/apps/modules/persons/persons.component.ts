import { Component } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { MenuElement } from 'src/app/core/header/header.component';

import { Environment } from 'toco-lib';

export enum Layouts {
  People,
  Main,
}

@Component({
  selector: 'sceiba-ui-persons-root',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss'],
})
export class PersonsComponent {
  public extraUser: MenuElement[];

  public constructor(
    private environment: Environment,
    private oauthStorage: OAuthStorage
  ) {}

  public ngOnInit(): void {
    this.extraUser = [
      {
        nameTranslate: 'IMPORTAR',
        icon: 'publish',
        useRouterLink: true,
        hideLabel: true,
        href: `${this.environment.organizations}/import`,
        disabled: this.hasPermissionAdmin,
      },
    ];
  }

  public get hasPermissionAdmin(): boolean {
    let roles = this.oauthStorage.getItem('roles');
    if (roles) {
      let r = JSON.parse(roles);
      for (const rol in r) {
        if (roles[rol] == 'admin') {
          return true;
        }
      }
    }
    return false;
  }
}
