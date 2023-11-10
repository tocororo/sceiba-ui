import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CoreModule, SearchModule } from 'toco-lib';
import { RecordSearchListComponent } from './search-list/search-list.component';
import { RecordSearchRoutingModule } from './search-routing.module';
import { RecordSearchComponent } from './search/search.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { SceibaUiSearchModule } from 'src/app/modules/common/search/search';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { RecordAggregationsComponent } from './aggregations/aggregations.component';
import { RecordsAgregationsModalComponent } from './agregations-modal/agregations-modal.component';
import { BarVerticalComponent } from './charts/bar-vertical/bar-vertical.component';
import { ChartsComponent } from './charts/charts.component';
import { GaugeChartComponent } from './charts/gauge-chart/gauge-chart.component';
import { PieGridComponent } from './charts/pie-grid/pie-grid.component';
import { PolarChartComponent } from './charts/polar-chart/polar-chart.component';

@NgModule({
  declarations: [
    RecordSearchComponent,
    RecordSearchListComponent,
    RecordAggregationsComponent,
    RecordsAgregationsModalComponent,
    ChartsComponent,
    PolarChartComponent,
    BarVerticalComponent,
    PieGridComponent,
    GaugeChartComponent,
  ],

  imports: [
    CommonModule,
    RecordSearchRoutingModule,
    CoreModule,
    SceibaUiSharedModule,
    NgxChartsModule,
    SearchModule,
    ScrollingModule,
    SceibaUiSearchModule
  ],
})
export class RecordSearchModule {}
