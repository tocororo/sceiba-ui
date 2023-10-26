import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import {
  Environment,
  OauthAuthenticationService,
  OauthInfo,
  User
} from 'toco-lib';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = "Sceiba";
  /**
   * Returns the available language texts.
   */
  public languageTexts: string[] = [];
  /**
   * Returns the available language abbreviations.
   */
  public languageAbbrs: string[] = [];
  /**
   * Returns the language currently used as number.
   * The Spanish language is: 0. It is the default.
   * The English language is: 1.
   */
  public currentLang: number = 1;

  public footerSites: Array<{
    name: string;
    url: string;
    useRouterLink: boolean;
  }> = [];

  public footerInformation: Array<{
    name: string;
    url: string;
    useRouterLink: boolean;
  }> = [];

  public user: User | null = new User();

  public sceibaHost: string = '';

  public oauthInfo: OauthInfo;

  private authenticateSuscription: Subscription | null = null;

  public constructor(
    private environment: Environment,
    // private matomoInjector: MatomoInjector,
    private router: Router,
    private oauthService: OAuthService,
    protected http: HttpClient,
    public iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private _transServ: TranslateService,
    private oauthStorage: OAuthStorage,
    private authenticateService: OauthAuthenticationService //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
  ) /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/ {
    // this.configure()
    let env: any = this.environment;
    this.oauthInfo = env.oauthInfo;
    // this.matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);
  }

  public ngOnInit(): void {
    let request = JSON.parse(this.oauthStorage.getItem('user'));

    if (request) {
      this.user = request.data.userprofile.user;
      this.configRoles();
    }

    this.authenticateSuscription =
      this.authenticateService.authenticationSubjectObservable.subscribe(
        (request) => {
          if (request) {
            this.user = request.data.userprofile.user;
            this.configRoles();
          } else {
            this.logoff();
          }
        },
        (error: any) => {
          this.user = null;
        },
        () => {}
      );

      this.setupIcons();
  }

  private setupIcons(){

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

  private configRoles() {
    let roles = "";
    for (const rol in this.user.roles) {
      const element = this.user.roles[rol];
      roles += "," + element.name;
    }
    this.oauthStorage.setItem("roles", roles);
  }
  ngOnDestroy(): void {
    if (this.authenticateSuscription) {
      this.authenticateSuscription.unsubscribe();
    }
  }

  public logoff() {
    this.oauthService.logOut();
    this.oauthStorage.removeItem('user');
    this.user = null;
  }

}
