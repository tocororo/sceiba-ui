import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HeaderService } from 'src/app/core/header.service';
import { MenuElement } from 'src/app/core/header/header.component';


@Component({
  selector: 'sceiba-ui-records-root',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent
{
  public _subMenus: MenuElement[] = [];

  public constructor(protected http: HttpClient,
    private headerService: HeaderService
    //private _recaptchaDynamicLanguageLoaderServ: RecaptchaLoaderService,
    /*@Inject(RecaptchaLoaderService) private _recaptchaDynamicLanguageLoaderServ: RecaptchaDynamicLanguageLoaderService*/)
  {

  }

  public ngOnInit(): void
  {

    let data = {
      icon: '',
      iconLabel: '',
      iconAlt: '',
      iconRoute: '',
      secondaryMenuElements: null,
      extraMenuAuthenticatedUser: null,
    };
    this.headerService.setHeaderData(data);
  }

  ngOnDestroy(): void {

  }

}
