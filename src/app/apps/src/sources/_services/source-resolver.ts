
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SourceService, SourceServiceNoAuth } from 'toco-lib';

@Injectable()
export class SourceResolver
{
    constructor(
      private service: SourceService,
      private serviceNoAuth: SourceServiceNoAuth,
      private router: Router,
      private oauthStorage: OAuthStorage)
    { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
      console.log("RESOLVE SOURCE")
        let uuid = route.paramMap.get('uuid');
        // return this.service.getSourceByUUIDWithVersions(uuid).pipe(
        let user = JSON.parse(this.oauthStorage.getItem("user"));
        if (user){
          return this.service.getSourceByUUID(uuid).pipe(
            take(1),
            map(source => {
                if (source) {
                    return source;
                } else {
                    this.router.navigate(['/sources']);
                }
            })
          );
        }else{
          return this.serviceNoAuth.getSourceByUUID(uuid).pipe(
            take(1),
            map(source => {
                if (source) {
                    return source;
                } else {
                    this.router.navigate(['/sources']);
                }
            })
          );
        }

    }
}

