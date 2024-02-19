import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/core/header.service';
import { Environment, USER_STORAGE_VAR } from 'toco-lib';
import { MenuElement } from 'src/app/core/header/header.component';
import { OAuthStorage } from 'angular-oauth2-oidc';


@Component({
  selector: 'seiba-ui-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent {
 /**
   * this menu represent all the views of the site
   * by carlosmonterrey17@gmail.com
   */

 public arrayMenuItems=[{content:'HOME',routerlink:"/"},
 {content:'TRANSFORMACION_DATOS',routerlink:"/data"},
 {content:'CONSULTAS_SPARQL',routerlink:"query/view"}]
 public _subMenus: MenuElement[];
 public env: Environment;


 constructor(private router: Router,    private oauthStorage: OAuthStorage,
  private environment: Environment,

  private headerService: HeaderService){
    this.env = this.environment;

  this._subMenus = [
    // {
    //   nameTranslate: 'HOME',
    //   useRouterLink: true,
    //   href: this.environment.revistasmes,
    // },
    {
      nameTranslate: 'CONSULTAS_SPARQL',
      useRouterLink: true,
      href: this.environment.graph +"/query",
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
    icon: '/assets/icons/apps/graph.png',
    iconLabel: 'TRANSFORMACION_DATOS',
    iconAlt: 'TRANSFORMACION_DATOS',
    iconRoute: this.env.graph,
    secondaryMenuElements: this._subMenus,
    extraMenuAuthenticatedUser: null,
  };
  this.headerService.setHeaderData(data);
 }

 public get notAuthenticated(): boolean {
  let request = JSON.parse(this.oauthStorage.getItem(USER_STORAGE_VAR));
  return request == (null || undefined);
}
}
