import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { CommonModule } from '@angular/common';
import {
  CoreModule, Environment
} from 'toco-lib';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { SceibaUiCoreModule } from './core/core.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { SceibaUiCoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent
],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    // SceibaUiCoreModule,

    // HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,

    FlexLayoutModule,
    // RecaptchaModule,

    CoreModule,

    AppRoutingModule,
    // MarkdownModule.forRoot({
    //   loader: HttpClient
    // }),

    SceibaUiCoreModule.forRoot()
  ],
  providers: [
    // SearchService,
    // OrganizationServiceNoAuth,
    // SourceServiceNoAuth,
    { provide: Environment, useValue: environment },
    // { provide: OAuthStorage, useFactory: storageFactory },
    // {
    //   provide: RecaptchaLoaderService,
    //   useClass: RecaptchaDynamicLanguageLoaderService,
    // },
    //RecaptchaDynamicLanguageLoaderService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
