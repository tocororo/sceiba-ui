import { Component } from "@angular/core";
// import { AuthConfig, JwksValidationHandler, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { OAuthStorage } from "angular-oauth2-oidc";
import { MenuElement } from "src/app/core/header/header.component";
import {
  Environment
} from "toco-lib";
import { Permission } from "../../src/organizations/_services/permission.service";

@Component({
  selector: "sceiba-ui-organizations-root",
  templateUrl: "./organizations.component.html",
  styleUrls: ["./organizations.component.scss"],
})
export class OrganizationsComponent {
  public _subMenus: MenuElement[];
  public extraUser: MenuElement[];
  public env: Environment;

  public constructor(
    private oauthStorage: OAuthStorage,
    private environment: Environment,
  ) {
    this.env = environment;

  }

  public ngOnInit(): void {

    this.extraUser = [
      {
        nameTranslate: 'DES_ORGANIZACIONES',
        icon: 'mode_edit',
        href: `${this.environment.organizations}/disambiguate`,
        useRouterLink: true,
        disabled: this.hasPermission
      },
      {
        nameTranslate: 'IMPORT',
        icon: 'file_upload',
        href: `${this.environment.organizations}/import`,
        useRouterLink: true,
        disabled: this.hasPermissionAdmin
      },
    ]
    this._subMenus = [
      // {
      //   nameTranslate: 'HOME',
      //   useRouterLink: true,
      //   href: this.environment.organizations,
      // },
      {
        nameTranslate: 'TOCO_SEARCH_SEARCH.SPAN_SEARCH_LABEL',
        useRouterLink: true,
        href: this.environment.organizations + '/search',
      },
      // {
      //   nameTranslate: 'REPORTS_STATISTICS',
      //   useRouterLink: true,
      //   href: this.environment.catalog + '/statistics',
      // },
    ];
  }
  /**
   * hasPermission return true if the user have permission
   */
  public get hasPermission(): boolean {
    let permission = new Permission(this.oauthStorage);

    if (
      permission.hasPermissions("curator") ||
      permission.hasPermissions("admin")
    ) {
      return false;
    }
    return true;
  }

  /**
   * hasPermission return true if the user have permission
   */
  public get hasPermissionAdmin(): boolean {
    let permission = new Permission(this.oauthStorage);

    if (permission.hasPermissions("admin")) {
      return false;
    }
    return true;
  }

}
