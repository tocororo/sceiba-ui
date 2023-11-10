
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { RecaptchaModule /*, RecaptchaLoaderService*/ } from 'ng-recaptcha';
import { MarkdownModule } from 'ngx-markdown';
import { SceibaUiSharedModule } from "src/app/shared/shared.module";
import { environment } from 'src/environments/environment';
import {
  CoreModule, Environment, OrganizationServiceNoAuth, SearchModule,
  SearchService, SourceServiceNoAuth, StaticsModule, TocoFormsModule, storageFactory
} from 'toco-lib';
import { HomeComponent } from '../../src/records/home/home.component';
import { PageNotFoundSceibaComponent } from '../../src/records/page-not-found-sceiba/page-not-found-sceiba.component';
import { RecordsRoutingModule } from './records-routing.module';
import { RecordsComponent } from './records.component';



export function createTranslateLoader(http: HttpClient): TranslateHttpLoader
{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    RecordsComponent,
    PageNotFoundSceibaComponent,
    HomeComponent,

    // ContactComponent,
    // SceibaMenuAppsComponent,
    // RecordSearchComponent,
    // RecordSearchListComponent,
    // RecordAggregationsComponent,
    // RecordsAgregationsModalComponent,
    // ChartsComponent,
    // PolarChartComponent,
    // BarVerticalComponent,
    // PieGridComponent,
    // GaugeChartComponent,

    // RecordViewComponent,
    // DialogCatalogSourceInfo,
    // SourcerecordViewComponent,

    // LinkStaticComponent,
    // StaticTableLinkComponent,
    // StaticChipsLinkComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,

    FlexLayoutModule,
    RecaptchaModule,

    CoreModule,
    SceibaUiSharedModule,

    StaticsModule,
    TocoFormsModule,
    SearchModule,

    RecordsRoutingModule,
    MarkdownModule.forRoot({
      loader: HttpClient
    }),
    // OAuthModule.forRoot({
    //   resourceServer: {
    //       allowedUrls: allowedURLS,
    //       sendAccessToken: true
    //   }
    // }),
    // MatomoModule

  ],
  providers: [
    SearchService,
    OrganizationServiceNoAuth,
    SourceServiceNoAuth,
    { provide: Environment, useValue: environment },
    { provide: OAuthStorage, useFactory: storageFactory },
    // {
    //   provide: RecaptchaLoaderService,
    //   useClass: RecaptchaDynamicLanguageLoaderService,
    // },
    //RecaptchaDynamicLanguageLoaderService,
  ],
  bootstrap: [RecordsComponent]
})
export class RecordsAppModule { }
