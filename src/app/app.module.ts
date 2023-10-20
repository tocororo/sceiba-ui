import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

import { allowedURLS } from 'src/environments/environment.development';
import { AuthenticationModule, CoreModule, Environment, OrganizationServiceNoAuth, SearchService, SourceServiceNoAuth, storageFactory } from 'toco-lib';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SceibaFooterComponent } from './footer/footer.component';
import { SceibaMenuAppsComponent } from './menu-apps/menu-apps.component';
import { SharedModule } from './shared/shared.module';


export function createTranslateLoader(http: HttpClient): TranslateHttpLoader
{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    SceibaFooterComponent,
    SceibaMenuAppsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,

    FlexLayoutModule,
    // RecaptchaModule,

    CoreModule,
    AuthenticationModule,

    AppRoutingModule,
    // MarkdownModule.forRoot({
    //   loader: HttpClient
    // }),
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: allowedURLS,
          sendAccessToken: true
      }
    }),

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
  bootstrap: [AppComponent]
})
export class AppModule { }
