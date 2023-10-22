import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { MessageHandler, StatusCode } from 'toco-lib';



@Injectable({
  providedIn: 'root'
})
export class CuratorPermissionService implements CanActivate{

  constructor(
    // private oauthStorage: OAuthStorage,
    private _router: Router,
    private _snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let permission = new Permission();

    if (permission.hasPermissions("curator") || permission.hasPermissions("admin")){
      return true;
    }
    this._router.navigate(['/']);
    const m = new MessageHandler(this._snackBar);
    m.showMessage(StatusCode.OK, "Usted no tiene los permisos para acceder");
    return false;
  }

}

@Injectable({
  providedIn: 'root'
})
export class AdminPermissionService implements CanActivate{

  constructor(
    // private oauthStorage: OAuthStorage,
    private _router: Router,
    private _snackBar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let permission = new Permission();

    if (permission.hasPermissions("admin")){
      return true;
    }
    this._router.navigate(['/']);
    const m = new MessageHandler(this._snackBar);
    m.showMessage(StatusCode.OK, "Usted no tiene los permisos para acceder");
    return false;
  }
}

export class Permission {

  constructor() {}

  public hasPermissions(roleName: string): boolean {
    // if (localStorage.getItem('mysources') && localStorage.getItem('mysources').length > 0){

    //   const sources = localStorage.getItem('mysources').data.sources

    //   for (const rol in roles) {
    //     if (roles[rol] == roleName){
    //       return true;
    //     }
    //   }
    // }
    // return false;
    return true;
  }
}
