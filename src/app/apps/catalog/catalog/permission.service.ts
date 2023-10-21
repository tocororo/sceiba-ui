import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { OAuthStorage } from "angular-oauth2-oidc";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SourceViewGuard {

  constructor(
    private oauthStorage: OAuthStorage,
    private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const uuid = route.params['uuid'];
    let user = JSON.parse(this.oauthStorage.getItem("user"));
    if (!user){
      return true;
    }else{
      this._router.navigate(['sources',uuid,'view']);
    }

  }

}
