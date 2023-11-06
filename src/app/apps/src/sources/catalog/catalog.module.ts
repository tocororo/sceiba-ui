import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule } from 'ngx-markdown';
import {
  CoreModule,
  OrganizationsModule,
  StaticsModule,
  TocoFormsModule,
} from 'toco-lib';
import { SharedModule } from '../shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import {
  CatalogComponent,
  DialogCatalogJournalInfoDialog,
} from './catalog.component';
import { FiltersComponent } from './filters/filters.component';
import { SearchListComponent } from './search-list/search-list.component';
import { SourceClassificationsComponent } from './source-classifications/source-classifications.component';
import { SourceEditJournalComponent } from './source-edit/journal-edit/journal-edit.component';
import { SourceEditComponent } from './source-edit/source-edit.component';
import {
  SourceEditAddIndexComponent,
  SourceEditIndexesComponent,
} from './source-edit/source-indexes/source-indexes.component';
import {
  SourceInclusionAcceptComponent,
  SourceInclusionComponent,
} from './source-inclusion/source-inclusion.component';
import {
  SourceEditOrganizationSelectDialog,
  SourceEditOrganizationSelectTopDialog,
  SourceEditOrganizationsComponent,
} from './source-organizations/source-organizations.component';
import { SourceRepositoryViewComponent } from './source-view/repository-view/repository-view.component';
import { SourceViewDefaultComponent } from './source-view/source-view-default/source-view-default.component';
import { SourceViewReadComponent } from './source-view/source-view-read/source-view-read.component';
import {
  SourceViewComponent,
  SourceViewSaveDialog,
} from './source-view/source-view.component';
import {
  SourceViewVersionInfoComponent,
  SourceViewVersionInfoFieldComponent,
} from './source-view/version-view/info/source-view-info.component';
import { SourceViewInfoSourceDefaultComponent } from './source-view/version-view/info/view-info-default';
import { SourceViewInfoJournalComponent } from './source-view/version-view/info/view-info-journal';
import { SourceJournalViewVersionFieldComponent } from './source-view/version-view/version-field/journal-view-version-field.component';
import { SourceJournalViewVersionTermComponent } from './source-view/version-view/version-term/journal-view-version-term.component';
import { SourceVersionViewComponent } from './source-view/version-view/version-view.component';
import { SourceJournalViewVersionComponent } from './source-view/version-view/version/journal-view-version.component';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    CatalogComponent,
    FiltersComponent,
    SourceEditComponent,
    SourceEditIndexesComponent,
    SourceEditAddIndexComponent,
    SourceEditOrganizationsComponent,
    SourceEditOrganizationSelectTopDialog,
    SourceEditOrganizationSelectDialog,
    SourceEditJournalComponent,
    SourceInclusionComponent,
    SourceInclusionAcceptComponent,
    SourceViewComponent,
    SourceViewSaveDialog,
    SourceViewReadComponent,
    SourceVersionViewComponent,
    SourceJournalViewVersionTermComponent,
    SourceJournalViewVersionFieldComponent,
    SourceJournalViewVersionComponent,
    SourceViewVersionInfoComponent,
    SourceViewVersionInfoFieldComponent,
    SourceViewInfoSourceDefaultComponent,
    SourceViewInfoJournalComponent,
    DialogCatalogJournalInfoDialog,
    SourceViewDefaultComponent,
    SourceClassificationsComponent,
    SearchListComponent,
    SourceRepositoryViewComponent,
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    SharedModule,
    CoreModule,
    StaticsModule,
    TocoFormsModule,
    FormsModule,
    FlexLayoutModule,
    OrganizationsModule,
    MarkdownModule.forRoot({
      loader: HttpClient,
    }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
})
export class CatalogModule {}
