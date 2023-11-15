import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceibaUiPageNotFoundComponent } from 'src/app/core/sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';
import { HomeComponent } from '../../src/records/home/home.component';
import { RecordResolverService } from '../../src/records/record/record-resolver.service';
import { RecordsComponent } from './records.component';

const routes: Routes = [
  {
    path: '',
    component: RecordsComponent,
    children: [
      {
        path: 'search',
        // component: SearchComponent,
        loadChildren: () =>
          import('../../src/records/search/search.module').then(
            (mod) => mod.RecordSearchModule
          ),
      },
      {
        path: ':uuid',
        // component: RecordViewComponent,
        resolve: {
          record: RecordResolverService,
        },
        loadChildren: () =>
          import('../../src/records/record/record.module').then(
            (mod) => mod.RecordModule
          ),
        // data: {
        // 	preload: true  /* In orden to use a custom preloading strategy (`SelectiveModulesPreload`). */
        // }
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: '**',
        component: SceibaUiPageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}
