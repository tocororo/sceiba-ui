import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HarvesterRoutingModule } from './harvester-routing.module';
import { HarvesterComponent } from './harvester.component';


@NgModule({
  declarations: [HarvesterComponent],
  imports: [
    CommonModule,
    HarvesterRoutingModule
  ]
})
export class HarvesterModule { }
