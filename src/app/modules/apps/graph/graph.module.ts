import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { RouterModule } from '@angular/router';
import { GraphComponent } from './graph.component';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [GraphComponent],
  imports: [
    CommonModule,
    GraphRoutingModule,
    RouterModule,
    FlexLayoutModule
  ]
})
export class GraphModule { }
