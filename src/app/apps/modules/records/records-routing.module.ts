import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../../src/records/home/home.component';
import { PageNotFoundSceibaComponent } from '../../src/records/page-not-found-sceiba/page-not-found-sceiba.component';
import { RecordsComponent } from './records.component';

const routes: Routes = [
  {
    path: '',
    component: RecordsComponent,
    children: [
      {
        path: ':uuid/view',
        loadChildren: () =>
          import('../../src/records/record/record.module').then(
            (mod) => mod.RecordModule
          ),
        // data: {
        // 	preload: true  /* In orden to use a custom preloading strategy (`SelectiveModulesPreload`). */
        // }
      },
      {
        path: 'search',
        loadChildren: () =>
          import('../../src/records/search/search.module').then(
            (mod) => mod.SearchPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../../src/records/profile/profile.module').then(
            (mod) => mod.ProfileModule
          ),
        canActivate: [],
      },
      {
        path: 'help',
        loadChildren: () =>
          import('../../src/records/help/help.module').then(
            (mod) => mod.HelpModule
          ),
      },
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: '**',
        component: PageNotFoundSceibaComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsRoutingModule {}
