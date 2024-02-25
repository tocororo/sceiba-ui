import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { OAuthStorage } from 'angular-oauth2-oidc';
import {
  CoreModule,
  Environment,
  OrganizationServiceNoAuth,
  OrganizationsModule,
  SearchModule,
  SearchService,
  SourceServiceNoAuth,
  StaticsModule,
  TocoFormsModule,
  storageFactory
} from 'toco-lib';

import { environment } from 'src/environments/environment';

import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'node_modules/ngx-dropzone';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { SceibaUiSearchModule } from '../../common/search/search.module';
import { OrgService } from '../../src/persons/_services/org.service';
import { ContactComponent } from '../../src/persons/contact/contact.component';
import { FooterComponent } from '../../src/persons/footer/footer.component';
import { HeaderComponent } from '../../src/persons/header/header.component';
import { MenuItemComponent } from '../../src/persons/header/menu-item/menu-item.component';
import { MenuComponent } from '../../src/persons/header/menu/menu.component';
import { HomeComponent } from '../../src/persons/home/home.component';
import { CsvTableComponent } from '../../src/persons/import-people/csv-table/csv-table.component';
import { ImportPeopleComponent } from '../../src/persons/import-people/import-people.component';
import { JsonTableComponent } from '../../src/persons/import-people/json-table/json-table.component';
import { MainlayoutComponent } from '../../src/persons/layout/mainlayout/mainlayout.component';
import { PeopleLayoutComponent } from '../../src/persons/layout/people-layout/people-layout.component';
import { PageNotFoundPeopleComponent } from '../../src/persons/page-not-found-people/page-not-found-people.component';
import { GeneralTabComponent } from '../../src/persons/people-view/general-tab/general-tab.component';
import { PeopleViewComponent } from '../../src/persons/people-view/people-view.component';
import { SearchListComponent } from '../../src/persons/search-list/search-list.component';
import { SearchComponent } from '../../src/persons/search/search.component';
import { SelectOrgComponent } from '../../src/persons/select-org/select-org.component';
import { PersonsRoutingModule } from './persons-routing.module';
import { PersonsComponent } from './persons.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  exports: [MainlayoutComponent, PeopleLayoutComponent],
  declarations: [
    PersonsComponent,
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
    ContactComponent,
    JsonTableComponent,
    CsvTableComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    NgxDropzoneModule,
    TranslateModule.forChild({
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
    SceibaUiSharedModule,
    FormsModule,
    CoreModule,
    StaticsModule,
    TocoFormsModule,
    SearchModule,
    OrganizationsModule,
    PersonsRoutingModule,
    SceibaUiSearchModule
    // OAuthModule.forRoot({
    //   resourceServer: {
    //     allowedUrls: allowedURLS,
    //     sendAccessToken: true,
    //   },
    // }),
  ],
  providers: [
    SearchService,
    SourceServiceNoAuth,
    OrganizationServiceNoAuth,
    OrgService,
    { provide: Environment, useValue: environment },
    { provide: OAuthStorage, useFactory: storageFactory },
  ],
  bootstrap: [PersonsComponent],
})
export class PersonsAppModule {}
