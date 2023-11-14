import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { Environment, USER_STORAGE_VAR } from 'toco-lib';

@Injectable({
  providedIn: 'any',
})
export class SourceViewGuard {
  constructor(
    private oauthStorage: OAuthStorage,
    private _router: Router,
    private environment: Environment
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const uuid = route.params['uuid'];
    // TODO: if current user can edit source version, else redirect.
    let user = JSON.parse(this.oauthStorage.getItem(USER_STORAGE_VAR));
    if (user) {
      return true;
    } else {
      // console.log(route);
      // TODO: redirect to :uuid
      // this._router.navigate([this._router.url, 'view']);
      return false;
    }
  }
}

@Injectable({
  providedIn: 'any',
})
export class SourceViewGuardRedirect {
  constructor(
    private oauthStorage: OAuthStorage,
    private _router: Router,
    private environment: Environment
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const uuid = route.params['uuid'];
    let user = JSON.parse(this.oauthStorage.getItem(USER_STORAGE_VAR));
    if (!user) {
      return true;
    } else {
      console.log(this._router.url)
      let path = this._router.url.split('?');
      if (path.length > 0) {
        this._router.navigate([path[0], uuid, 'view']);
        // console.log(path);

      }
      else {
        this._router.navigate(['/']);
      }
      // TODO: if current user can access to source version, redirect.
    }
  }
}
