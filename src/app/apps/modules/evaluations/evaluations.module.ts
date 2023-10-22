import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { OAuthModule, OAuthStorage } from "angular-oauth2-oidc";
import { RecaptchaModule } from "ng-recaptcha";
import { MarkdownModule } from "ngx-markdown";
import { allowedURLS, environment } from "src/environments/environment";

import {
  AuthenticationModule,
  CoreModule,
  Environment,
  HTTP_INTERCEPTOR_PROVIDERS,
  StaticsModule,
  TocoFormsModule,
} from "toco-lib";
import { ContactComponent } from "../../src/evaluations/contact/contact.component";
import { FooterComponent } from "../../src/evaluations/footer/footer.component";
import { HeaderComponent } from "../../src/evaluations/header/header.component";
import { MenuItemComponent } from "../../src/evaluations/header/menu-item/menu-item.component";
import { MenuComponent } from "../../src/evaluations/header/menu/menu.component";
import { HomeComponent } from "../../src/evaluations/home/home.component";
import { SceibaMenuAppsComponent } from "../../src/evaluations/menu-apps/menu-apps.component";
import { PageNotFoundEvaluationComponent } from "../../src/evaluations/page-not-found-evaluation/page-not-found-evaluation.component";
import { EvaluationsRoutingModule } from "./evaluations-routing.module";
import { EvaluationsComponent } from "./evaluations.component";
// import {
// 	AngularMaterialModule,OrganizationServiceNoAuth, SearchModule,
// 	SearchService, SourceServiceNoAuth, StaticsModule, TocoFormsModule
//   } from 'toco-lib';
import { CommonModule } from "@angular/common";
import { CategoryTableComponent } from "../../src/evaluations/evaluation-view/category-table/category-table.component";
import { EvaluationViewComponent } from "../../src/evaluations/evaluation-view/evaluation-view.component";
import { MyEvaluationComponent } from "../../src/evaluations/my-evaluation/my-evaluation.component";
import { SharedModule } from "../../src/evaluations/shared/shared.module";
export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    EvaluationsComponent,
    HomeComponent,
    PageNotFoundEvaluationComponent,
    FooterComponent,
    HeaderComponent,
    ContactComponent,
    MenuComponent,
    MenuItemComponent,
    MyEvaluationComponent,
    SceibaMenuAppsComponent,
    EvaluationViewComponent,
    CategoryTableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ReactiveFormsModule,
    FlexLayoutModule,
    RecaptchaModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),

    SharedModule,
    CoreModule,
    StaticsModule,
    TocoFormsModule,
    AuthenticationModule,

    EvaluationsRoutingModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: allowedURLS,
        sendAccessToken: true,
      },
    }),
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS,
    { provide: Environment, useValue: environment },
    { provide: OAuthStorage, useFactory: storageFactory },
  ],
  bootstrap: [EvaluationsComponent],
})
export class EvaluationsAppModule {}
