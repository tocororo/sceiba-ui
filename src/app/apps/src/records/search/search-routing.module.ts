import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordSearchComponent } from './search/search.component';

const searchRoutes: Routes = [
  {
    path: '',
    component: RecordSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(searchRoutes)],

  exports: [RouterModule],
})
export class RecordSearchRoutingModule {}
