/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { OAuthService, OAuthStorage } from "angular-oauth2-oidc";
import { Subscription } from "rxjs";
import {
  Environment,
  OauthAuthenticationService,
  OauthInfo,
  User
} from "toco-lib";

@Component({
  selector: "seiba-ui-revistasmes-root",
  templateUrl: "./revistasmes.component.html",
  styleUrls: ["./revistasmes.component.scss"],
})
export class RevistasMesComponent {
  /**
   * Returns the available language texts.
   */
  public languageTexts: string[];
  /**
   * Returns the available language abbreviations.
   */
  public languageAbbrs: string[];
  /**
   * Returns the language selected.
   * The default language is Spanish; that is, the zero index.
   */
  public languageSelected: number;

  public oauthInfo: OauthInfo;

  public title = "Registro de Revistas Científicas del MES";

  public isOnline: boolean;

  public islogged: boolean;

  user: User;
  loading = false;
  private authenticateSuscription: Subscription = null;

  public footerSites: Array<{
    name: string;
    url: string;
    useRouterLink: boolean;
  }>;

  public footerInformation: Array<{
    name: string;
    url: string;
    useRouterLink: boolean;
  }>;

  // public footerImage: string

  constructor(
    private environment: Environment,
    private oauthStorage: OAuthStorage,
    private oauthService: OAuthService,
    private authenticateService: OauthAuthenticationService,
    private router: Router,
    private _transServ: TranslateService
  ) {
    let env: any = this.environment;
    this.oauthInfo = env.oauthInfo;
    this.isOnline = true; //navigator.onLine;
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        }

        if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.loading = false;
        }
      },
      (error: any) => {},
      () => {}
    );
  }
  ngOnInit(): void {
    this.languageTexts = ["Español", "English"];
    this.languageAbbrs = ["es", "en"];
    this.languageSelected = 0; /* The default language is Spanish; that is, the zero index. */
    this._transServ.setDefaultLang("es");
    this._transServ.use("es");
    this._transServ.addLangs(this.languageAbbrs);
    let request = JSON.parse(this.oauthStorage.getItem("user"));
    if (request) {
      this.user = request;
    }

    console.log(this.user);
    this.authenticateSuscription =
      this.authenticateService.authenticationSubjectObservable.subscribe(
        (request) => {
          if (request != null) {
            console.log("request", request);
            this.user = request;
            // if (this.oauthStorage.getItem('access_token')) {
            //   this.user = this.oauthStorage.getItem('email');
            // }
          } else {
            this.logoff();
          }
        },
        (error: any) => {
          this.user = null;
        },
        () => {}
      );
    this.footerInformation = Array();
    this.footerSites = Array();

    this.footerSites.push({
      name: "MES",
      url: "https://www.mes.gob.cu",
      useRouterLink: false,
    });
    // this.footerSites.push({ name: "Sceiba", url: "https://sceiba-lab.upr.edu.cu", useRouterLink: false});
    // this.footerSites.push({ name: "Dirección Nacional de Publicaciones Seriadas", url: "http://www.seriadascubanas.cult.cu/http://www.seriadascubanas.cult.cu/", useRouterLink:false});
    // this.footerSites.push({ name: "Red Ciencia", url: "http://www.redciencia.cu/", useRouterLink: false});

    // this.footerInformation.push({ name: "Términos de uso", url: "https://sceiba-lab.upr.edu.cu/page/politicas", useRouterLink: false});
    // this.footerInformation.push({ name: "Privacidad", url: "https://sceiba-lab.upr.edu.cu/page/politicas", useRouterLink: false});
    this.footerInformation.push({
      name: "Contacto",
      url: "/contact",
      useRouterLink: true,
    });
    this.footerInformation.push({
      name: "FAQs",
      url: "/faq",
      useRouterLink: true,
    });
  }

  ngOnDestroy(): void {
    if (this.authenticateSuscription) {
      this.authenticateSuscription.unsubscribe();
    }
  }

  public logoff() {
    this.oauthService.logOut();
    this.oauthStorage.removeItem("user");
    this.user = undefined;
  }

  /**
   * Sets the current language.
   * @param index Zero-based index that indicates the current language.
   */
  public setLanguage(index: number): void {
    switch ((this.languageSelected = index)) {
      case 0 /* Spanish */: {
        this._transServ.use("es");
        //this._recaptchaDynamicLanguageLoaderServ.updateLanguage('es');
        return;
      }

      case 1 /* English */: {
        this._transServ.use("en");
        //this._recaptchaDynamicLanguageLoaderServ.updateLanguage('en');
        return;
      }
    }
  }
}
