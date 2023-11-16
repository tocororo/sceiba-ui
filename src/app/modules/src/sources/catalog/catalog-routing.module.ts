import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceNoAuthResolver, SourceResolver } from '../_services/source-resolver';
import { CatalogComponent } from './catalog.component';
import { SourceViewGuard, SourceViewGuardRedirect } from './permission.service';
import { SourceInclusionComponent } from './source-inclusion/source-inclusion.component';
import { SourceViewReadComponent } from './source-view/source-view-read/source-view-read.component';
import { SourceViewComponent } from './source-view/source-view.component';


const routes: Routes = [
  {
    path: '',
    component: CatalogComponent
  },
  {
    path: 'new',
    children: [
      {
        path: 'journal',
        component: SourceInclusionComponent,
      },
    ],
  },
  {
    path: ':uuid',
    component: SourceViewReadComponent,
    canActivate: [SourceViewGuardRedirect],
    resolve: {
      source: SourceNoAuthResolver,
    },
  },
  {
    path: ':uuid/view',
    component: SourceViewComponent,
    canActivate: [SourceViewGuard],
    resolve: {
      source: SourceResolver,
    },
  },
  // {
  //   path: ':uuid/edit',
  //   component: SourceEditComponent,
  //   canActivate: [SourceViewGuard],
  //   resolve: {
  //     source: SourceResolver,
  //   },
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
