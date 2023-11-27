import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuElement } from './header/header.component';
import { Environment } from 'toco-lib';
import { AuthConfig } from 'angular-oauth2-oidc';


export class HeaderServiceData {
  icon: string;
  iconLabel: string;
  iconAlt: string;
  iconRoute: string;
  secondaryMenuElements: MenuElement[];
  extraMenuAuthenticatedUser: MenuElement[];
}

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  constructor() {
  }
  private headerDataSubject = new Subject<any>();

  headerDataObservable$ = this.headerDataSubject.asObservable();

  setHeaderData(data: HeaderServiceData) {
    this.headerDataSubject.next(data);
  }
}

@Injectable({ providedIn: 'root' })
export class ConfigService {

  constructor(private _env: Environment,) {
  }
  

  getConfig(): AuthConfig {
    return {
      // Url of the Identity Provider
      // issuer: this._env.appHost,

      loginUrl: this._env.oauthInfo.loginUrl,

      tokenEndpoint: this._env.oauthInfo.tokenEndpoint,
      
      clientId: this._env.oauthInfo.oauthClientId, // The "Auth Code + PKCE" client
      
      redirectUri: this._env.oauthInfo.oauthRedirectUri,
      
      silentRefreshRedirectUri: this._env.oauthInfo.oauthRedirectUri,
      
      scope: this._env.oauthInfo.oauthScope, // Ask offline_access to support refresh token refreshes
      
      // requireHttps: true,
      
      oidc: false,
      
      // responseType: 'token',
      
      // useSilentRefresh: true, // Needed for Code Flow to suggest using iframe-based refreshes
      
      // silentRefreshTimeout: 5000, // For faster testing
      
      // timeoutFactor: 0.25, // For faster testing
      
      // sessionChecksEnabled: true, //Beginning with version 2.1, you can receive a notification when the user signs out with the identity provider. This is implemented as defined by the OpenID Connect Session Management 1.0 spec.
      
      // showDebugInformation: true, // Also requires enabling "Verbose" level in devtools
      
      // clearHashAfterLogin: false, // https://github.com/manfredsteyer/angular-oauth2-oidc/issues/457#issuecomment-431807040,
      
      // nonceStateSeparator : 'semicolon' // Real semicolon gets mangled by Duende ID Server's URI encoding
    
    };
  }
}