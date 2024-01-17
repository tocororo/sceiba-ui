import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';

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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxDropzoneModule } from 'node_modules/ngx-dropzone';
import { OAuthStorage } from 'angular-oauth2-oidc';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { allowedURLS, environment } from 'src/environments/environment';

import { AddModalComponent } from '../../src/patents/add-modal/add-modal.component';
import { ChartComponent } from "../../src/patents/chart/chart.component";
import { ConfirmComponent } from "../../src/patents/confirm/confirm.component";
import { ExportPdfExcelComponent } from "../../src/patents/export-pdf-excel/export-pdf-excel.component";
import { HeaderComponent } from "../../src/patents/header/header.component";
import { HomeComponent } from "../../src/patents/home/home.component";
import { ImportPatentsComponent } from "../../src/patents/import-patents/import-patents.component";
import { MainlayoutComponent } from "../../src/patents/layout/mainlayout/mainlayout.component";
import { MenuComponent } from "../../src/patents/header/menu/menu.component";
import { MenuItemComponent } from "../../src/patents/header/menu-item/menu-item.component";
import { OpenPatentDetailComponent } from "../../src/patents/open-patent-detail/open-patent-detail.component";
import { PatentsRoutingModule } from './patents-routing.module';
import { PatentsComponent } from './patents.component';
import { PdfViewerModalComponent } from '../../src/patents/open-patent-detail/pdf-viewer-modal/pdf-viewer-modal.component';
import { ProfileComponent } from "../../src/patents/profile/profile.component";
import { ProfileLayoutComponent } from "../../src/patents/layout/profile-layout/profile-layout.component";
import { RegisterComponent } from "../../src/patents/register/register.component";
import { SceibaUiSearchModule } from '../../common/search/search.module';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { SearchComponent } from "../../src/patents/search/search.component";
import { SearchListComponent } from "../../src/patents/search-list/search-list.component";
import { SolicitarPatenteComponent } from '../../src/patents/solicitar-patente/solicitar-patente.component';
import { TableComponent } from "../../src/patents/import-patents/table/table.component";

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  // exports: [MainlayoutComponent],
  declarations: [
    AddModalComponent,
    ChartComponent,
    ConfirmComponent,
    ExportPdfExcelComponent,
    HeaderComponent,
    HomeComponent,
    MainlayoutComponent,
    MenuComponent,
    MenuItemComponent,
    ImportPatentsComponent,
    OpenPatentDetailComponent,
    PatentsComponent,
    PdfViewerModalComponent,
    ProfileComponent,
    ProfileLayoutComponent,
    RegisterComponent,
    SearchComponent,
    SearchListComponent,
    SolicitarPatenteComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FlexLayoutModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    MatPaginatorModule,
    MatTableModule,
    NgxDropzoneModule,
    PatentsRoutingModule,
    PdfViewerModule,
    ReactiveFormsModule,
    SceibaUiSearchModule,
    SceibaUiSharedModule,
    SearchModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    SearchService,
    { provide: Environment, useValue: environment },
  ],
  bootstrap: [PatentsComponent],
})
export class PatentsModule { }
