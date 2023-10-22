import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { MarkdownModule } from "ngx-markdown";

import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";

import { OAuthModule, OAuthStorage } from "angular-oauth2-oidc";
import {
  AuthenticationModule,
  CoreModule,
  Environment, OrganizationServiceNoAuth,
  OrganizationsModule,
  SearchModule,
  SearchService,
  SourceServiceNoAuth,
  StaticsModule,
  TocoFormsModule
} from "toco-lib";

import { allowedURLS, environment } from "src/environments/environment";

import { NgxDropzoneModule } from "node_modules/ngx-dropzone";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactComponent } from "./contact/contact.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { MenuItemComponent } from "./header/menu-item/menu-item.component";
import { MenuComponent } from "./header/menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { CsvTableComponent } from './import-people/csv-table/csv-table.component';
import { ImportPeopleComponent } from "./import-people/import-people.component";
import { JsonTableComponent } from './import-people/json-table/json-table.component';
import { OrgDialogComponent } from "./import-people/org-dialog/org-dialog.component";
import { MainlayoutComponent } from "./layout/mainlayout/mainlayout.component";
import { PeopleLayoutComponent } from "./layout/people-layout/people-layout.component";
import { OrgService } from "./org.service";
import { PageNotFoundPeopleComponent } from "./page-not-found-people/page-not-found-people.component";
import { GeneralTabComponent } from "./people-view/general-tab/general-tab.component";
import { PeopleViewComponent } from "./people-view/people-view.component";
import { SearchListComponent } from "./search-list/search-list.component";
import { SearchComponent } from "./search/search.component";
import { SelectOrgComponent } from "./select-org/select-org.component";
import { SharedModule } from "./shared/shared.module";

export function storageFactory(): OAuthStorage {
  return localStorage;
}

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
    exports: [MainlayoutComponent, PeopleLayoutComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        PageNotFoundPeopleComponent,
        FooterComponent,
        SearchComponent,
        SearchListComponent,
        PeopleViewComponent,
        MainlayoutComponent,
        PeopleLayoutComponent,
        GeneralTabComponent,
        HeaderComponent,
        MenuComponent,
        MenuItemComponent,
        ImportPeopleComponent,
        SelectOrgComponent,
        OrgDialogComponent,
        ContactComponent,
        JsonTableComponent,
        CsvTableComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatTableModule,
        MatPaginatorModule,
        NgxDropzoneModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient],
            },
        }),
        ReactiveFormsModule,
        FlexLayoutModule,
        MarkdownModule.forRoot({
            loader: HttpClient,
        }),

        TocoFormsModule,
        SharedModule,
        FormsModule,
        CoreModule,
        StaticsModule,
        TocoFormsModule,
        SearchModule,
        AuthenticationModule,
        OrganizationsModule,
        AppRoutingModule,
        OAuthModule.forRoot({
            resourceServer: {
                allowedUrls: allowedURLS,
                sendAccessToken: true,
            },
        }),
    ],
    providers: [
        SearchService,
        SourceServiceNoAuth,
        OrganizationServiceNoAuth,
        OrgService,
        { provide: Environment, useValue: environment },
        { provide: OAuthStorage, useFactory: storageFactory },
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
