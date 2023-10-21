
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { RecaptchaModule /*, RecaptchaLoaderService*/ } from 'ng-recaptcha';
import { MarkdownModule } from 'ngx-markdown';
import {
  AuthenticationModule, CoreModule, Environment, OrganizationServiceNoAuth, SearchModule,
  SearchService, SourceServiceNoAuth, StaticsModule, TocoFormsModule
} from 'toco-lib';
import { allowedURLS, environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { SceibaFooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SceibaMenuAppsComponent } from './menu-apps/menu-apps.component';
import { PageNotFoundSceibaComponent } from './page-not-found-sceiba/page-not-found-sceiba.component';
import { SharedModule } from './shared/shared.module';



export function storageFactory(): OAuthStorage {
  return sessionStorage
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader
{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundSceibaComponent,
    HomeComponent,

    ContactComponent,
    SceibaFooterComponent,
    SceibaMenuAppsComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
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
    RecaptchaModule,

    CoreModule,
    SharedModule,

    StaticsModule,
    TocoFormsModule,
    SearchModule,
    AuthenticationModule,

    AppRoutingModule,
    MarkdownModule.forRoot({
      loader: HttpClient
    }),
    OAuthModule.forRoot({
      resourceServer: {
          allowedUrls: allowedURLS,
          sendAccessToken: true
      }
    }),
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
  bootstrap: [AppComponent]
})
export class AppModule { }
