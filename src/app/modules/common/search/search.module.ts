import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { CoreModule, SearchModule } from 'toco-lib';
import { SceibaUiSearchAggregationsComponent } from './aggregations/aggregations.component';
import { SceibaUiSearchSelectOrgComponent } from './org-search-dialog/org-dialog.component';
import { SceibaUiQueryInputComponent } from './query-input/query-input.component';
import { SceibaUiSearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    SceibaUiSearchAggregationsComponent,
    SceibaUiQueryInputComponent,
    SceibaUiSearchComponent,
    SceibaUiSearchSelectOrgComponent
  ],

  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TranslateModule,
    SceibaUiSharedModule,
    CoreModule,
    SearchModule,
  ],
  exports: [
    SceibaUiSearchAggregationsComponent,
    SceibaUiQueryInputComponent,
    SceibaUiSearchComponent,
    SceibaUiSearchSelectOrgComponent
  ],
})
export class SceibaUiSearchModule {}
