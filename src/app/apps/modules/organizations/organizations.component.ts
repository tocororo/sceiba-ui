import { Component } from "@angular/core";
// import { AuthConfig, JwksValidationHandler, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
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

  public extraUser: MenuElement[];

  public constructor(
    private environment: Environment,
  ) {
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
  }
  /**
   * hasPermission return true if the user have permission
   */
  public get hasPermission(): boolean {
    let permission = new Permission();

    if (
      permission.hasPermissions("curator") ||
      permission.hasPermissions("admin")
    ) {
      return true;
    }
    return false;
  }

  /**
   * hasPermission return true if the user have permission
   */
  public get hasPermissionAdmin(): boolean {
    let permission = new Permission();

    if (permission.hasPermissions("admin")) {
      return true;
    }
    return false;
  }

}
