import { Component } from '@angular/core';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { HeaderService } from 'src/app/core/header.service';
import { MenuElement } from 'src/app/core/header/header.component';
import { Environment  } from 'toco-lib';

@Component({
  selector: 'seiba-ui-patents',
  templateUrl: './patents.component.html',
  styleUrls: ['./patents.component.scss'],
})
export class PatentsComponent {

  public extraUser: MenuElement[];
  public _subMenus: MenuElement[];
  public env: Environment;

  public constructor(
    private environment: Environment,
    private oauthStorage: OAuthStorage,
    private headerService: HeaderService
  ) {
    this.env = environment
  }

  public ngOnInit(): void {
    this.extraUser = [
      {
        nameTranslate: 'IMPORTAR',
        icon: 'publish',
        useRouterLink: true,
        hideLabel: true,
        href: `${this.environment.patents}/import`,
        disabled: this.hasPermissionAdmin,
      },
      {
        nameTranslate: 'REGISTRO',
        icon: 'publish',
        useRouterLink: true,
        hideLabel: true,
        href: `${this.environment.patents}/register`,
        disabled: this.hasPermissionAdmin,
      },
    ];
    this._subMenus = [
      {
        nameTranslate: 'TOCO_SEARCH_SEARCH.SPAN_SEARCH_LABEL',
        useRouterLink: true,
        href: this.environment.patents + '/search',
      },
    ];

    let data = {
      icon: '/assets/icons/apps/persons.svg',
      iconLabel: 'SCEIBA_PATENTES',
      iconAlt: 'PATENTES',
      iconRoute: this.env.patents,
      secondaryMenuElements: this._subMenus,
      extraMenuAuthenticatedUser: this.extraUser,
    };
    this.headerService.setHeaderData(data);
  }

  public get hasPermissionAdmin(): boolean {
    let roles = this.oauthStorage.getItem('roles');
    if (roles) {
      let r = roles.split(',');
      for (const rol in r) {
        if (roles[rol] == 'admin') {
          return true;
        }
      }
    }
    return false;
  }
}
