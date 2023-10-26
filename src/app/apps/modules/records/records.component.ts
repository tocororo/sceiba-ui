import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { OAuthService, OAuthStorage } from 'angular-oauth2-oidc';
import { MenuElement } from 'src/app/core/header/header.component';
import {
  Environment, OauthAuthenticationService
} from 'toco-lib';


@Component({
  selector: 'sceiba-ui-records-root',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent
{
  public _subMenus: MenuElement[] = [];

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

  }

  public ngOnInit(): void
  {

  }

  ngOnDestroy(): void {

  }

}
