import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeaderService } from 'src/app/core/header.service';
import { MenuElement } from 'src/app/core/header/header.component';
import { Environment } from 'toco-lib';


@Component({
  selector: 'sceiba-ui-records-root',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent
{
  public _subMenus: MenuElement[] = [];

  public constructor(protected http: HttpClient,
    private headerService: HeaderService,
    private environment: Environment
    //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
    /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/)
  {

  }

  public ngOnInit(): void
  {
    this._subMenus = [
      // {
      //   nameTranslate: 'HOME',
      //   useRouterLink: true,
      //   href: this.environment.catalog,
      // },
      {
        nameTranslate: 'TOCO_SEARCH_SEARCH.SPAN_SEARCH_LABEL',
        useRouterLink: true,
        href: this.environment.discover + '/search',
      },
      // {
      //   nameTranslate: 'REPORTS_STATISTICS',
      //   useRouterLink: true,
      //   href: this.environment.catalog + '/statistics',
      // },
    ];

    let data = {
      icon: '/assets/icons/apps/discover.svg',
      iconLabel: 'BUSQUEDA',
      iconAlt: 'BUSQUEDA',
      iconRoute: this.environment.discover,
      secondaryMenuElements: this._subMenus,
      extraMenuAuthenticatedUser: null,
    };
    this.headerService.setHeaderData(data);
  }

  ngOnDestroy(): void {

  }

}
