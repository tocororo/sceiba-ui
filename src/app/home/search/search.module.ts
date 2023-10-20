import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CoreModule, SearchModule } from "toco-lib";
import { AggregationsComponent } from "./aggregations/aggregations.component";
import { SearchListComponent } from "./search-list/search-list.component";
import { SearchRoutingModule } from "./search-routing.module";
import { SearchComponent } from "./search/search.component";

import { NgxChartsModule } from "@swimlane/ngx-charts";

import { SharedModule } from "../shared/shared.module";
import { BarVerticalComponent } from "./charts/bar-vertical/bar-vertical.component";
import { ChartsComponent } from "./charts/charts.component";
import { GaugeChartComponent } from "./charts/gauge-chart/gauge-chart.component";
import { PieGridComponent } from "./charts/pie-grid/pie-grid.component";
import { PolarChartComponent } from "./charts/polar-chart/polar-chart.component";

@NgModule({
  declarations: [
    SearchComponent,
    SearchListComponent,
    AggregationsComponent,

    ChartsComponent,
    PolarChartComponent,
    BarVerticalComponent,
    PieGridComponent,
    GaugeChartComponent,
  ],

  imports: [
    CommonModule,
    SearchRoutingModule,
    CoreModule,
    SharedModule,
    NgxChartsModule,
    SearchModule,
  ],
})
export class SearchPageModule {}
