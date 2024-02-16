import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/core/header.service';
import { Environment } from 'toco-lib';
import { MenuElement } from 'src/app/core/header/header.component';
import { OAuthStorage } from 'angular-oauth2-oidc';

@Component({
  selector: 'seiba-ui-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit{

  // env: Environment;
  public _subMenus: MenuElement[];
  public extraUser: MenuElement[];

  constructor(private headerService: HeaderService,
              private environment: Environment,
              private oauthStorage: OAuthStorage,){}

  ngOnInit(){

    this.extraUser = [
      {
        nameTranslate: 'IMPORTAR',
        icon: 'publish',
        useRouterLink: true,
        hideLabel: true,
        href: `${this.environment.projects}/import`,
        disabled: this.hasPermissionAdmin,
      },
    ];

    this._subMenus = [
      {
        nameTranslate: 'TOCO_SEARCH_SEARCH.SPAN_SEARCH_LABEL',
        useRouterLink: true,
        href: this.environment.projects + '/search',
      },
    ];

    let data = {
      icon: '/assets/icons/apps/projects.svg',
      iconLabel: 'SCEIBA_PROYECTOS',
      iconAlt: 'SCEIBA_PROYECTOS',
      iconRoute: this.environment.projects,
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
