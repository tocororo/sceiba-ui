import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { Observable, Subscription } from 'rxjs';
import {
  Environment,
  Response,
  User,
  UserProfile,
  convertLangFromNumberToString,
} from 'toco-lib';
import { OauthInfo } from '../authentication/authentication.component';
import { OauthAuthenticationService } from '../authentication/authentication.service';
import { HeaderService } from '../header.service';

@Component({
  selector: 'sceiba-ui-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class SceibaUIHeaderComponent implements OnInit {
  /**
   * Returns the available language texts.
   */
  @Input() public languageTexts: string[] = ['Español', 'English'];
  /**
   * Returns the available language abbreviations.
   */
  @Input() public languageAbbrs: string[] = ['es', 'en'];
  /**
   * Returns the language currently used as number.
   * The Spanish language is: 0. It is the default.
   * The English language is: 1.
   */
  public currentLang: number;

  /**
   * Gets the icon for menu bar
   */
  @Input() public isBeta: boolean = true;
  /**
   * Gets the icon for menu bar
   */
  @Input() public icon: '';
  /**
   * Gets the icon label for menu bar
   */
  @Input() public iconLabel: '';

  @Input() public iconRoute: '';

  /**
   * Gets the icon alt for menu bar
   */
  @Input() public iconAlt: '';

  /**
   * List of extra icons to the main menu bar, beside, apps, lang and user icons.
   */
  @Input() public extraMainMenuIcons: MenuElement[];

  /**
   * Extra elements to authenticated user menu
   */
  @Input() public extraMenuAuthenticatedUser: MenuElement[];

  /**
   * Extra elements to help  menu
   */
  @Input() public extraMenuHelp: MenuElement[];

  /**
   * Secondary menu elements.
   */
  @Input() public secondaryMenuElements: MenuElement[];

  /**
   * Gets a list of input `menuLoginOptions` to build the login menu
   */
  @Input() public menuLoginOptions: MenuElement[];

  /**
   * Gets a boolean value of input `showMenuLang` to show a menuAppsnu
   */
  @Input() public showMenuLang: boolean;
  /**
   * Gets a value of input `isAuthenticated` to know when user is authenticated
   */
  @Input() public isAuthenticated: boolean = false;
  /**
   * Gets a value of input `autehnticated_name` to know the name of the authenticated user
   */
  @Input() public autehnticated_name: string = '';

  public _menuMainIcons: MenuElement[];
  public _menuAuthenticatedUser: MenuElement[];
  public _menuHelp: MenuElement[];
  public _menuApps: MenuElement[];

  public menuIconsStatic: MenuElement[];

  public sceibaHost: string;

  public simpleMenu = false;

  public user: User = null;
  public userProfile: UserProfile = null;

  public oauthInfo: OauthInfo;

  private authenticateSuscription: Subscription = null;

  private headerSubscription: Subscription;

  public constructor(
    private _env: Environment,
    private _transServ: TranslateService,
    private router: Router,
    private oauthService: OAuthService,
    protected http: HttpClient,
    private oauthStorage: OAuthStorage,
    private authenticateService: OauthAuthenticationService,
    private headerService: HeaderService
  ) {
    let env: any = this._env;
    this.oauthInfo = env.oauthInfo;


    this.headerSubscription = this.headerService.headerDataObservable$.subscribe({
      next: (data) => {
        this.icon = data.icon;
        this.iconLabel = data.iconLabel;
        this.iconAlt = data.iconAlt;
        this.iconRoute = data.iconRoute;
        this.secondaryMenuElements = data.secondaryMenuElements;
        this.extraMenuAuthenticatedUser = data.extraMenuAuthenticatedUser;
        this.setupMenus();
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete headerSubscription')
    });

  }

  ngOnInit() {
    this.sceibaHost = this._env.sceibaHost;



    this.setupUser();
    this.setupLang();
    this.setupMenus();

    // console.log('USER:', this.user);
    let roles = this.oauthStorage.getItem('roles');
    // console.log('ROLES:', roles);
  }

  private setupLang() {
    this.currentLang = 0; /* The default language is Spanish; that is, the zero index. */
    this.showMenuLang == undefined ? (this.showMenuLang = false) : null;

    this._transServ.setDefaultLang('es');
    this._transServ.use('es');
    this._transServ.addLangs(this.languageAbbrs);
  }

  private setupMenus() {
    let defaultAuthUserMenu: MenuElement[] = [
      {
        nameTranslate: 'ACCOUNT_SETTINGS',
        icon: 'account_circle',
        href: `${this.sceibaHost}account/settings/profile/`,
        useRouterLink: false,
        target: '_blank',
      },
      {
        nameTranslate: 'PERFIL_USUARIO',
        icon: 'person_outline',
        href: `/person/${this.user && this.user.id}`,
        useRouterLink: true,
      },
      {
        nameTranslate: 'CAMBIAR_CONTRASEÑA',
        icon: 'vpn_key',
        href: `${this.sceibaHost}account/settings/password/`,
        useRouterLink: false,
        target: '_blank',
      },
      {
        nameTranslate: 'SEGURIDAD',
        icon: 'security',
        href: `${this.sceibaHost}account/settings/security/`,
        useRouterLink: false,
        target: '_blank',
      },
      {
        nameTranslate: 'APLICACIONES',
        icon: 'settings_applications',
        href: `${this.sceibaHost}account/settings/applications/`,
        useRouterLink: false,
        target: '_blank',
      },
      {
        nameTranslate: 'SALIR',
        icon: 'exit_to_app',
        href: '/',
        useRouterLink: true,
        click: () => this.logoff(),
      },
    ];
    this._menuAuthenticatedUser = [];
    if (this.extraMenuAuthenticatedUser) {
      this.extraMenuAuthenticatedUser.forEach((element) => {
        this._menuAuthenticatedUser.push(element);
      });
    }
    defaultAuthUserMenu.forEach((element) => {
      this._menuAuthenticatedUser.push(element);
    });

    this._menuHelp = [
      {
        nameTranslate: 'FAQS',
        href: '/help/faq',
        useRouterLink: true,
        icon: 'question_answer',
      },
      {
        nameTranslate: 'TERMINOS_DE_USO',
        href: '/help/terms',
        useRouterLink: true,
        icon: 'info',
      },
      {
        nameTranslate: 'ACERCA_DE',
        href: '/help/about',
        useRouterLink: true,
        icon: 'info',
      },
      {
        nameTranslate: 'PRIVACIDAD',
        href: '/help/policy',
        useRouterLink: true,
        icon: 'security',
      },
      {
        nameTranslate: 'CONTACTOS',
        href: '/help/contact',
        useRouterLink: true,
        icon: 'contacts',
      },
    ];
    if (this.extraMenuHelp) {
      this.extraMenuHelp.forEach((element) => {
        this._menuHelp.push(element);
      });
    }

    this._menuApps = [
      {
        nameTranslate: 'SCEIBA',
        // @ts-ignore
        href: this._env.sceiba,
        target: '_self',
        useRouterLink: true,
        img: { src: '/assets/icons/apps/sceiba.svg', style: '' },
        divider: true,
      },
      {
        nameTranslate: 'BUSQUEDA',
        // @ts-ignore
        href: this._env.discover,
        target: '_self',
        useRouterLink: true,
        img: {
          src: '/assets/icons/apps/discover.svg',
          style: 'width: 55px; height: 55px',
        },
      },
      {
        nameTranslate: 'REVISTAS_MES',
        // @ts-ignore
        href: this._env.revistasmes,
        target: '_self',
        useRouterLink: true,
        img: {
          src: '/assets/icons/apps/revistasmes.png',
          style: 'width: 55px; height: 55px',
        },
      },
      {
        nameTranslate: 'CATALOGO',
        // @ts-ignore
        href: this._env.catalog,
        target: '_self',
        useRouterLink: true,
        img: {
          src: '/assets/icons/apps/catalog.svg',
          style: 'width: 55px; height: 55px',
        },
        divider: true,
      },
      {
        nameTranslate: 'ORGANIZACIONES',
        // @ts-ignore
        href: this._env.organizations,
        target: '_self',
        useRouterLink: true,
        img: {
          src: '/assets/icons/apps/organizaciones.svg',
          style: 'width: 55px; height: 55px',
        },
      },
      {
        nameTranslate: 'PERSONAS',
        // @ts-ignore
        href: this._env.persons,
        target: '_self',
        useRouterLink: true,
        img: {
          src: '/assets/icons/apps/persons.svg',
          style: 'width: 55px; height: 55px',
        },
      },
      {
        nameTranslate: 'VOCABULARIOS',
        // @ts-ignore
        href: this._env.vocabularies,
        target: '_blank',
        useRouterLink: false,
        img: {
          src: '/assets/icons/apps/vocabs.svg',
          style: 'width: 55px; height: 55px',
        },
        divider: true,
      },
      {
        nameTranslate: 'SMOODLE',
        // @ts-ignore
        href: this._env.moodle,
        target: '_blank',
        useRouterLink: false,
        img: {
          src: '/assets/icons/apps/scourses.svg',
          style: 'width: 55px; height: 55px',
        },
      },
      {
        nameTranslate: 'EVALUACION_APP',
        // @ts-ignore
        href: this._env.evaluations,
        target: '_self',
        useRouterLink: true,
        img: {
          src: '/assets/icons/apps/evaluations.svg',
          style: 'width: 55px; height: 55px',
        },
      },
    ];

    let defaultIcons: MenuElement[] = [
      {
        nameTranslate: 'APLICACIONES',
        icon: 'apps',
        childrenMenu: this._menuApps,
        isMenuApps: true,
      },
      {
        nameTranslate: 'AYUDA',
        icon: 'help',
        childrenMenu: this._menuHelp,
      },
    ];

    if (this.extraMainMenuIcons) {
      this.menuIconsStatic = this.menuIconsStatic.concat(defaultIcons);
    } else {
      this.menuIconsStatic = defaultIcons;
    }
    this._menuMainIcons = this.menuIconsStatic;
    if (this.user) {
      this._menuMainIcons.concat({
        nameTranslate: this.user ? this.user.email.split('@')[0] : '',
        icon: 'person_pin',
        childrenMenu: this._menuAuthenticatedUser,
        hideLabel: true,
      });
    }
  }

  private setupUser() {
    let request = JSON.parse(this.oauthStorage.getItem('user'));
    // console.log(this.oauthStorage, 'storageeeeee', request, 'USERRRRRRRRRRR');

    if (request && request.user && request.user.data) {
      this.userProfile = request.user.data.userprofile;
      this.user = this.userProfile.user;

      this.user = request;
      this.configRoles();
    }

    this.authenticateSuscription =
      this.authenticateService.authenticationSubjectObservable.subscribe(
        (request) => {
          if (request && request.user && request.user.data) {
            this.userProfile = request.user.data.userprofile;
            this.user = this.userProfile.user;

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
  }
  private configRoles() {
    let roles = '';
    for (const rol in this.user.roles) {
      const element = this.user.roles[rol];
      roles += ',' + element.name;
    }
    this.oauthStorage.setItem('roles', roles);
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
  }

  /*******************************************************************
   * Check if display is less than 600px to update menu classes
   * @returns String
   */
  showHideMenuHeader(): string {
    let menuClass =
      'menuAppst-menu-trigger menuAppst-icon-button menuAppst-button-base';
    return window.innerWidth < 600
      ? menuClass + ' show-menu'
      : menuClass + ' hide-menu';
  }
  showHideMenuHeaderElements(): string {
    return window.innerWidth > 600
      ? 'menu-full show-menu-elements'
      : 'menu-full hide-menu';
  }

  /**
   * Sets the current language.
   * @param index Zero-based index that indicates the current language.
   */
  public setLanguage(index: number): void {
    if (index != this.currentLang) {
      console.log('setLanguage method is called with language: ', index);

      let currentLangAsString: string = convertLangFromNumberToString(
        (this.currentLang = index)
      );

      /* Informs the new current language. */
      this._transServ.use(currentLangAsString);
      // this._recaptchaDynamicLanguageLoaderServ.updateLanguage(currentLangAsString);
    }
  }

  public get isHome() {
    return this.router.url == '/';
  }

  public login() {
    console.log('hi');

    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
    this.oauthStorage.removeItem('user');
    this.oauthStorage.removeItem('roles');
    this.user = undefined;
    this._menuMainIcons = this.menuIconsStatic;
  }

  public get name() {
    let user = JSON.parse(this.oauthStorage.getItem('user'));
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
    return this.http.get<Response<any>>(this._env.sceibaApi + 'me');
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
}

interface IMG {
  src: string;
  style: string;
}

export interface MenuElement {
  nameTranslate: string;
  href?: string;
  target?: string;
  useRouterLink?: boolean;
  icon?: string;
  click?: any;
  img?: IMG;
  divider?: boolean;
  hidden?: boolean;
  isMenuApps?: boolean;
  childrenMenu?: MenuElement[];
  hideLabel?: boolean;
  disabled?: boolean;
}
