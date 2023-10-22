import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HarvesterComponent } from './harvester.component';

const routes: Routes = [{ path: '', component: HarvesterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HarvesterRoutingModule { }
