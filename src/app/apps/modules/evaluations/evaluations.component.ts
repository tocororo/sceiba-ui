import { HttpClient } from "@angular/common/http";
import { Component, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ActionText, Environment, MessageHandler, StatusCode } from "toco-lib";

import { MatIconRegistry } from "@angular/material/icon";
import { MatSidenav } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer } from "@angular/platform-browser";
import { OAuthService, OAuthStorage } from "angular-oauth2-oidc";
import { Observable, Subscription } from "rxjs";
import {
  OauthAuthenticationService,
  OauthInfo,
  Response,
  User,
} from "toco-lib";
import { EvaluationService } from "../../src/evaluations/_services/evaluationService.service";

@Component({
  selector: "sceiba-ui-evaluations-root",
  templateUrl: "./evaluations.component.html",
  styleUrls: ["./evaluations.component.scss"],
})
export class EvaluationsComponent {
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

  public user: User;

  public sceibaHost: string;

  public oauthInfo: OauthInfo;

  private authenticateSuscription: Subscription = null;

  @ViewChild("sidenav") sidenav: MatSidenav;
  sideNavOpen: boolean = false;
  public readonly actionText: typeof ActionText;
  hasTaskInProgress = false;

  public constructor(
    private _env: Environment,
    private _router: Router,
    private oauthService: OAuthService,
    protected http: HttpClient,
    private oauthStorage: OAuthStorage,
    private authenticateService: OauthAuthenticationService,
    public iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    private EvaluationService: EvaluationService
  ) //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
  /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/ {
    let env: any = this._env;
    this.oauthInfo = env.oauthInfo;
    this.actionText = ActionText;
    // this._matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);


    this.iconRegistry.addSvgIcon(
      "facebook",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/svg/facebook.svg"
      )
    );
    this.iconRegistry.addSvgIcon(
      "twitter",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/svg/twitter.svg"
      )
    );
    this.iconRegistry.addSvgIcon(
      "github",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/images/svg/github.svg"
      )
    );

    this.iconRegistry.addSvgIcon(
      "journals",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/apps/journals.svg"
      )
    );
    this.iconRegistry.addSvgIcon(
      "publishing",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/apps/publishing.svg"
      )
    );
    this.iconRegistry.addSvgIcon(
      "publication",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/apps/publication.svg"
      )
    );
    this.iconRegistry.addSvgIcon(
      "organizaciones",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/apps/organizaciones.svg"
      )
    );
    this.iconRegistry.addSvgIcon(
      "persons",
      this.sanitizer.bypassSecurityTrustResourceUrl(
        "/assets/icons/apps/persons.svg"
      )
    );
  }

  public ngOnInit(): void {
    //this._recaptchaDynamicLanguageLoaderServ.updateLanguage('es');

    this.sceibaHost = this._env.sceibaHost;

    this.footerSites = Array();
    this.footerInformation = Array();

    let request = JSON.parse(this.oauthStorage.getItem("user"));
    if (request) {
      this.user = request;
    }
    this.authenticateSuscription =
      this.authenticateService.authenticationSubjectObservable.subscribe(
        (request) => {
          if (request != null) {
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

    // this.footerSites.push({ name: "MES", url: "https://www.mes.gob.cu", useRouterLink: false});
    // this.footerSites.push({ name: "ONEI", url: "http://www.onei.gob.cu/", useRouterLink:false});
    // this.footerSites.push({ name: "GRID", url: "https://www.grid.ac", useRouterLink: false});
    // this.footerSites.push({ name: "ROR", url: "https://ror.org/", useRouterLink: false});
    // this.footerSites.push({ name: "Wikidata", url: "https://www.wikidata.org/wiki/Wikidata:Main_Page", useRouterLink: false});

    this.footerInformation.push({
      name: "ACERCA_DE",
      url: "/help/about",
      useRouterLink: true,
    });
    this.footerInformation.push({
      name: "PRIVACIDAD",
      url: "/help/policy",
      useRouterLink: true,
    });
    // this.footerInformation.push({ name: "PRIVACIDAD", url: "https://sceiba-lab.upr.edu.cu/page/politicas", useRouterLink: false});
    this.footerInformation.push({
      name: "CONTACTOS",
      url: "/help/contact",
      useRouterLink: true,
    });
  }

  ngOnDestroy(): void {
    if (this.authenticateSuscription) {
      this.authenticateSuscription.unsubscribe();
    }
  }

  public get isHome() {
    return this._router.url == "/";
  }

  public login() {
    console.log("hi");

    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
    this.oauthStorage.removeItem("user");
    this.user = undefined;
  }

  public get name() {
    let user = JSON.parse(this.oauthStorage.getItem("user"));
    console.log(`Userrrrrrr: ${user}`);

    if (!user) return null;
    return user["email"];
  }

  getUserInfo(): Observable<Response<any>> {
    // let token = this.oauthStorage.getItem('access_token');
    // let headers = new HttpHeaders()
    // headers.set('Authorization', 'Bearer ' + token);
    // headers = headers.set('Content-Type', 'application/json');
    // headers = headers.set('Access-Control-Allow-Origin', '*');
    // const options = {
    //   headers: headers
    // };
    return this.http.get<Response<any>>(this._env.sceibaApi + "me");
  }

  public me() {
    this.getUserInfo().subscribe({
      next: (response) => {
        console.log(response);
      },

      error: (e) => {},

      complete: () => {},
    });
  }

  close() {
    this.sidenav.close();
  }

  toogle() {
    if (this.sideNavOpen) {
      this.sidenav.close();
      this.sideNavOpen = false;
      return;
    }
    this.sidenav.open();
    this.sideNavOpen = true;
  }

  public createEvaluation() {
    this.hasTaskInProgress = true;
    this.EvaluationService.createEvaluation().subscribe({
      next: (result: any) => {
        this.hasTaskInProgress = false;
        const uuid = result.data.evaluation.uuid;
        this._router.navigate(["survey", uuid, this.actionText.add]);
      },
      error: (err: any) => {
        const m = new MessageHandler(this._snackBar);
        m.showMessage(StatusCode.OK, err.message);
      },
    });
    this.toogle();
  }

  goToMyEvaluations() {
    this._router.navigate(["evaluations"]);
    this.toogle();
  }

  goToHome() {
    this._router.navigate([""]);
    this.toogle();
  }
}
