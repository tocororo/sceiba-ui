import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';
import { OAuthStorage } from 'angular-oauth2-oidc';

import {
  CoreModule,
  Environment,
  SearchModule,
  SearchService,
  SourceServiceNoAuth,
  StaticsModule,
  TocoFormsModule,
  storageFactory
} from 'toco-lib';
import { NgxDropzoneModule } from 'node_modules/ngx-dropzone';
import { environment } from 'src/environments/environment';

import { CsvTableComponent } from '../../src/projects/import-project/csv-table/csv-table.component';
import { DeleteDialogComponent } from '../../src/projects/dialogs/delete/delete-dialog.component';
import { GeneralTabComponent } from '../../src/projects/project-view/general-tab/general-tab.component';
import { HeaderComponent } from '../../src/projects/header/header.component';
import { HomeComponent } from '../../src/projects/home/home.component';
import { ImportPeopleComponent } from '../../src/projects/import-project/import-people.component';
import { JsonTableComponent } from '../../src/projects/import-project/json-table/json-table.component';
import { MainlayoutComponent } from '../../src/projects/layout/mainlayout/mainlayout.component';
import { MenuComponent } from '../../src/projects/header/menu/menu.component';
import { MenuItemComponent } from '../../src/projects/header/menu-item/menu-item.component';
import { NewProjectComponent } from '../../src/projects/new-project/new-dialog.component';
import { OtherTabComponent } from '../../src/projects/project-view/other-tab/other-tab.component';
import { PageNotFoundPeopleComponent } from '../../src/projects/page-not-found-project/page-not-found-people.component';
import { ProjectAggregationsComponent } from '../../src/projects/aggregations/aggregations.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { PeopleLayoutComponent } from '../../src/projects/layout/project-layout/project-layout.component';
import { ProjectsComponent } from './projects.component';
import { ProjectViewComponent } from '../../src/projects/project-view/project-view.component';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { SceibaUiSearchModule } from '../../common/search/search.module';
import { SearchComponent } from '../../src/projects/search/search.component';
import { SearchListComponent } from '../../src/projects/search-list/search-list.component';
import { TocoSnackbarComponent } from '../../src/projects/toco-snackbar/toco-snackbar.component';
import { UpdateDialogComponent } from '../../src/projects/dialogs/update/update-dialog.component';
import { UpdateProjectComponent } from '../../src/projects/update-project/update-dialog.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    CsvTableComponent,
    GeneralTabComponent,
    HeaderComponent,
    HomeComponent,
    ImportPeopleComponent,
    JsonTableComponent,
    MainlayoutComponent,
    MenuItemComponent,
    MenuComponent,
    OtherTabComponent,
    PageNotFoundPeopleComponent,
    PeopleLayoutComponent,
    ProjectAggregationsComponent,
    ProjectsComponent,
    ProjectViewComponent,
    SearchComponent,
    SearchListComponent,

  ],
  imports: [
    CommonModule,
    CoreModule,
    DeleteDialogComponent,
    FlexLayoutModule,
    FormsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    NewProjectComponent,
    NgxDropzoneModule,
    ProjectsRoutingModule,
    SceibaUiSharedModule,
    SceibaUiSearchModule,
    SearchModule,
    StaticsModule,
    TocoFormsModule,
    TocoSnackbarComponent,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    UpdateDialogComponent,
    UpdateProjectComponent,
  ],
  providers: [
    SearchService,
    SourceServiceNoAuth,
    { provide: Environment, useValue: environment },
    { provide: OAuthStorage, useFactory: storageFactory },
  ]
})
export class ProjectsModule { }
