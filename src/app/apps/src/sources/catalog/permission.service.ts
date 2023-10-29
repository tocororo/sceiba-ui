import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { OAuthStorage } from "angular-oauth2-oidc";
import { Observable } from "rxjs";
import { Environment } from "toco-lib";

@Injectable({
  providedIn: 'any'
})
export class SourceViewGuard {

  constructor(
    private oauthStorage: OAuthStorage,
    private _router: Router,
    private environment: Environment) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const uuid = route.params['uuid'];
    let request = JSON.parse(this.oauthStorage.getItem('user'));

    let user = JSON.parse(this.oauthStorage.getItem("user"));
    console.log(user,request, "REDIRECTING!!!!!!!!");
    if (!user){
      return true;
    }else{
      console.log("REDIRECTING!!!!!!!!");

      this._router.navigate([this.environment.catalog, 'sources',uuid,'view']);
    }

  }

}
