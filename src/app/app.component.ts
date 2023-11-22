import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  Event as NavigationEvent,
  NavigationStart,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import {
  Environment,
  OauthAuthenticationService,
  OauthInfo,
  User,
} from 'toco-lib';
import { HeaderService } from './core/header.service';
import { isMobile } from './modules/common/is-mobile';

interface Menu {
  label: string;
  href: string;
  icon: string;
  children?: Menu[];
  useHrefLink?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Sceiba';
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

  currentPath: string;
  routerEvent;
  mode: 'side' | 'push' | 'over' = 'side';
  menuApps: Menu[];
  secondaryMenuElements: [];

  private headerSubscription: Subscription;

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
    private headerService: HeaderService,
    private authenticateService: OauthAuthenticationService //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
  ) /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/ {
    // this.configure()
    let env: any = this.environment;
    this.oauthInfo = env.oauthInfo;
    // this.matomoInjector.init('https://crai-stats.upr.edu.cu/', 6);

    this.headerSubscription =
      this.headerService.headerDataObservable$.subscribe({
        next: (data) => {
          this.menuApps = [
            // {
            //   label: 'SCEIBA',
            //   // @ts-ignore
            //   href: this.environment.sceiba,
            //   icon: '/assets/icons/apps/sceiba.svg',
            // },
            {
              label: 'BUSQUEDA',
              // @ts-ignore
              href: this.environment.discover,
              icon: '/assets/icons/apps/discover.svg',
            },
            {
              label: 'REVISTAS_MES',
              // @ts-ignore
              href: this.environment.revistasmes,
              icon: '/assets/icons/apps/revistasmes.png',
            },
            {
              label: 'ORGANIZACIONES',
              // @ts-ignore
              href: this.environment.organizations,
              icon: '/assets/icons/apps/organizaciones.svg',
            },
            {
              label: 'PERSONAS',
              // @ts-ignore
              href: this.environment.persons,
              icon: '/assets/icons/apps/persons.svg',
            },
            {
              label: 'EVALUACION_APP',
              // @ts-ignore
              href: this.environment.evaluations,
              icon: '/assets/icons/apps/evaluations.svg',
            },
            {
              label: 'VOCABULARIOS',
              // @ts-ignore
              href: this.environment.vocabularies,
              icon: '/assets/icons/apps/vocabs.svg',
              useHrefLink:true
            },
            {
              label: 'SMOODLE',
              // @ts-ignore
              href: this.environment.moodle,
              icon: '/assets/icons/apps/scourses.svg',
              useHrefLink:true
            },
            {
              label: 'CATALOGO',
              // @ts-ignore
              href: this.environment.catalog,
              icon: '/assets/icons/apps/catalog.svg',
            },
          ];
          const children = data?.secondaryMenuElements?.map((menu) => ({
            label: menu.nameTranslate,
            href: menu.href,
          }));this.menuApps.length
          if (children && children.length > 0){
            const index = this.menuApps.findIndex(
              (menu) => menu.href != '/' && children[0].href.includes(menu.href)
            );
            if (index > -1) {
              this.menuApps[index] = { ...this.menuApps[index], children };
            }
          }

        },
        error: (e) => console.error(e),
        complete: () => console.info('complete headerSubscription'),
      });
  }

  public ngOnInit(): void {
    console.log(isMobile());
    this.mode = isMobile() ? 'over' : 'side';

    this.currentPath = this.router.url;
    this.routerEvent = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.currentPath = event.url;
        }
      }
    );
    
		this.footerInformation.push({ name: "ACERCA_DE", url: "/help/about", useRouterLink: true });
		this.footerInformation.push({ name: "PRIVACIDAD", url: "/help/policy", useRouterLink: true });
		this.footerInformation.push({ name: "CONTACTOS", url: "/help/contact", useRouterLink: true });

    this.setupIcons();

    // let request = JSON.parse(this.oauthStorage.getItem('user'));

    // if (request) {
    //   this.user = request.data.userprofile.user;
    //   this.configRoles();
    // }

    // this.authenticateSuscription =
    //   this.authenticateService.authenticationSubjectObservable.subscribe(
    //     (request) => {
    //       if (request) {
    //         this.user = request.data.userprofile.user;
    //         this.configRoles();
    //       } else {
    //         this.logoff();
    //       }
    //     },
    //     (error: any) => {
    //       this.user = null;
    //     },
    //     () => {}
    //   );
  }

  private setupIcons() {
    this.iconRegistry.addSvgIcon(
      'facebook',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/svg/facebook.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'twitter',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/svg/twitter.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'github',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/images/svg/github.svg'
      )
    );

    this.iconRegistry.addSvgIcon(
      'journals',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/apps/journals.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'publishing',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/apps/publishing.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'publication',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/apps/publication.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'organizaciones',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/apps/organizaciones.svg'
      )
    );
    this.iconRegistry.addSvgIcon(
      'persons',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        '/assets/icons/apps/persons.svg'
      )
    );
  }

  private configRoles() {
    // let roles = "";
    // for (const rol in this.user.roles) {
    //   const element = this.user.roles[rol];
    //   roles += "," + element.name;
    // }
    // this.oauthStorage.setItem("roles", roles);
  }
  ngOnDestroy(): void {
    // if (this.authenticateSuscription) {
    //   this.authenticateSuscription.unsubscribe();
    // }
  }

  public logoff() {
    // this.oauthService.logOut();
    // this.oauthStorage.removeItem('user');
    // this.user = null;
  }
}
