import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import {
  CoreModule,
  Environment,
  HTTP_INTERCEPTOR_PROVIDERS,
  NotificationModule,
  OrganizationServiceNoAuth,
  OrganizationsModule,
  SearchService,
  SourceService,
  SourceServiceNoAuth,
  TaxonomyService,
  TocoFormsModule,
  UserProfileService,
  storageFactory,
} from 'toco-lib';
import { CatalogModule } from '../../src/sources/catalog/catalog.module';
import { PermissionsModule } from '../../src/sources/permissions/permissions.module';

import { CommonModule } from '@angular/common';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';
import { HomeRevistasmesComponent } from '../../src/revistasmes/home/home.component';
import { RevistasMesRoutingModule } from './revistasmes-routing.module';
import { RevistasMesComponent } from './revistasmes.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [RevistasMesComponent, HomeRevistasmesComponent],
  imports: [
    CommonModule,
    SceibaUiSharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    RevistasMesRoutingModule,
    NotificationModule,
    TocoFormsModule,
    OrganizationsModule,
    CoreModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    CatalogModule,
    PermissionsModule,
    // OAuthModule.forRoot({
    //   resourceServer: {
    //     allowedUrls: allowedURLS,
    //     sendAccessToken: true,
    //   },
    // }),
  ],
  providers: [
    SearchService,
    SourceService,
    SourceServiceNoAuth,
    UserProfileService,
    TaxonomyService,
    OrganizationServiceNoAuth,
    HTTP_INTERCEPTOR_PROVIDERS,
    { provide: OAuthStorage, useFactory: storageFactory },

    // REQUEST_CACHE_DIFFERENT_TIME_WITH_MAP_PROVIDER,
    // { provide: HTTP_INTERCEPTORS, useClass: OauthAuthenticationService, multi: true },
    { provide: Environment, useValue: environment },
  ],
  bootstrap: [RevistasMesComponent],
})
export class RevistasMesAppModule {}
