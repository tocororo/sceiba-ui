import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Observable, Subscription } from 'rxjs';
import {
  Environment, OauthAuthenticationService, OauthInfo, Response, User,
  convertLangFromNumberToString
} from 'toco-lib';


@Component({
  selector: 'sceiba-ui-records-root',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent
{
  /**
   * Returns the available language texts.
   */
  public languageTexts: string[];
  /**
   * Returns the available language abbreviations.
   */
  public languageAbbrs: string[];
  /**
   * Returns the language currently used as number.
   * The Spanish language is: 0. It is the default.
   * The English language is: 1.
   */
  public currentLang: number;

  public footerSites: Array<{ name: string, url: string, useRouterLink: boolean }>;

  public footerInformation: Array<{ name: string, url: string, useRouterLink: boolean }>;

  public user: User;

  public sceibaHost: string;

  public oauthInfo: OauthInfo;

  private authenticateSuscription: Subscription = null;

  public constructor(private environment: Environment,
    // private matomoInjector: MatomoInjector,
    private router: Router,
    private oauthService: OAuthService,
    protected http: HttpClient,
    private _transServ: TranslateService,
    private oauthStorage: OAuthStorage,
    private authenticateService: OauthAuthenticationService,
    //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
    /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/)
  {
    // this.configure()
    let env: any = this.environment;
    this.oauthInfo = env.oauthInfo;
    // this.matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);
  }

  public ngOnInit(): void
  {
		this.languageTexts = ["Español", "English"];
    this.languageAbbrs = ["es", "en"];
		this.currentLang = 0;  /* The default language is Spanish; that is, the zero index. */
		this._transServ.setDefaultLang('es');
		this._transServ.use('es');
		this._transServ.addLangs(this.languageAbbrs);
    this.sceibaHost = this.environment.sceibaHost;
		//this._recaptchaDynamicLanguageLoaderServ.updateLanguage(LanguageAbbrs.es);

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
  }

  ngOnDestroy(): void {
    if (this.authenticateSuscription) {
      this.authenticateSuscription.unsubscribe();
    }
  }

  /**
   * Sets the current language.
   * @param index Zero-based index that indicates the current language.
   */
  public setLanguage(index: number): void
  {
    if (index != this.currentLang)
    {
      // console.log('setLanguage method is called with language: ', index);

      let currentLangAsString: string = convertLangFromNumberToString((this.currentLang = index));

      /* Informs the new current language. */
      this._transServ.use(currentLangAsString);
      // this._recaptchaDynamicLanguageLoaderServ.updateLanguage(currentLangAsString);
    }
  }

  public get isHome() {
    return this.router.url == '/';
  }

  // private configure() {
  //   this.oauthService.configure(authConfig);
  //   this.oauthService.tokenValidationHandler = new JwksValidationHandler();
  //   this.oauthService.loadDiscoveryDocumentAndTryLogin();
  // }

  public login() {
    console.log('hi');

    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
    this.oauthStorage.removeItem("user");
    this.user = undefined;
  }

  public get name()
  {
    let user = JSON.parse(this.oauthStorage.getItem("user"));
    if (!user) return null;
    return user['email'];
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
    return this.http.get<Response<any>>(this.environment.sceibaApi + 'me');
  }

  public me()
  {
    this.getUserInfo().subscribe({
      next: (response) => {
        console.log(response)
      },

      error: (e) => { },

      complete: () => { },
    });
  }

  // /**
  //  * hasPermission return true if the user have permission
  //  */
  // public get hasPermission(): boolean {
  //   let permission = new Permission();

  //   if (permission.hasPermissions("curator") || permission.hasPermissions("admin")){
  //     return true;
  //   }
  //   return false;
  // }

  // /**
  //  * hasPermission return true if the user have permission
  //  */
  // public get hasPermissionAdmin(): boolean {
  //   let permission = new Permission();

  //   if (permission.hasPermissions("admin")){
  //     return true;
  //   }
  //   return false;
  // }
}
