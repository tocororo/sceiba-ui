import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SourceResolver } from '../_services/source-resolver';
import { CatalogComponent } from './catalog.component';
import { SourceViewGuard } from './permission.service';
import { SourceEditComponent } from './source-edit/source-edit.component';
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
    canActivate: [SourceViewGuard],
    resolve: {
      source: SourceResolver,
    },
  },
  {
    path: ':uuid/view',
    component: SourceViewComponent,
    resolve: {
      source: SourceResolver,
    },
  },
  {
    path: ':uuid/edit',
    component: SourceEditComponent,
    resolve: {
      source: SourceResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
