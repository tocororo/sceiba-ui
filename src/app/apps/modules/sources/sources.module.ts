
// import { BrowserModule } from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MarkdownModule } from 'ngx-markdown';
import {
  AuthenticationModule, CoreModule, Environment,
  HTTP_INTERCEPTOR_PROVIDERS, NotificationModule, OrganizationServiceNoAuth,
  OrganizationsModule, SearchService, SourceService, SourceServiceNoAuth,
  TaxonomyService, TocoFormsModule, UserProfileService
} from 'toco-lib';

import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SceibaFooterComponent } from '../../src/sources/footer/footer.component';
import { HomeComponent } from '../../src/sources/home/home.component';
import { SceibaMenuAppsComponent } from '../../src/sources/menu-apps/menu-apps.component';
import { SharedModule } from '../../src/sources/shared/shared.module';
import { StaticPagesComponent } from '../../src/sources/static-pages/static-pages.component';
import { StatisticsComponent } from '../../src/sources/statistics/statistics.component';
import { UserProfileComponent } from '../../src/sources/user-profile/user-profile.component';
import { SoucesRoutingModule } from './sources-routing.module';
import { SourcesComponent } from './sources.component';




export function createTranslateLoader(http: HttpClient): TranslateHttpLoader
{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    SourcesComponent,
    HomeComponent,
    SceibaFooterComponent,
    StaticPagesComponent,
    UserProfileComponent,
    StatisticsComponent,
    SceibaMenuAppsComponent
  ],
  exports:[
    SceibaFooterComponent,
    SceibaMenuAppsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxChartsModule,
    TranslateModule.forChild({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    // BrowserModule,
    SoucesRoutingModule,
    NotificationModule,
    TocoFormsModule,
    OrganizationsModule,
    CoreModule,
    AuthenticationModule,
    // TaxonomyModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      loader: HttpClient
    })
  ],
  providers: [
    SearchService,
    SourceService,
    SourceServiceNoAuth,
    UserProfileService,
    TaxonomyService,
    OrganizationServiceNoAuth,
    HTTP_INTERCEPTOR_PROVIDERS,
    // REQUEST_CACHE_DIFFERENT_TIME_WITH_MAP_PROVIDER,
    // { provide: HTTP_INTERCEPTORS, useClass: OauthAuthenticationService, multi: true },
    { provide: Environment, useValue: environment }
  ],
  bootstrap: [SourcesComponent]
})
export class SolurcesAppModule { }
