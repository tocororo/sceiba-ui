import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule } from '@ngx-translate/core';
import { CoreModule, SearchModule } from 'toco-lib';
import { SceibaUiSearchAggregationsComponent } from './aggregations/aggregations.component';
import { SceibaUiQueryInputComponent } from './query-input/query-input.component';

@NgModule({
  declarations: [
    SceibaUiSearchAggregationsComponent,
    SceibaUiQueryInputComponent,
  ],

  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDividerModule,
    MatCheckboxModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatTooltipModule,
    CoreModule,
    SearchModule,
  ],
  exports: [SceibaUiSearchAggregationsComponent, SceibaUiQueryInputComponent],
})
export class SceibaUiSearchModule {}
