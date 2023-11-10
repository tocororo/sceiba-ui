import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RecordResolverService } from './record-resolver.service';
import { RecordViewComponent } from './record-view/record-view.component';

const recordRoutes: Routes = [
  {
    path: '',
    component: RecordViewComponent,
    resolve: {
      record: RecordResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(recordRoutes)],

  exports: [RouterModule],
})
export class RecordRoutingModule {}
