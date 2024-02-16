import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminPermissionService } from '../../src/patents/services/permission.service';
import { ContactComponent } from '../../src/persons/contact/contact.component';
import { HelpComponent } from '../help/help.component';
import { HomeComponent } from '../../src/patents/home/home.component';
import { ImportPatentsComponent } from '../../src/patents/import-patents/import-patents.component';
import { MainlayoutComponent } from '../../src/patents/layout/mainlayout/mainlayout.component';
import { OpenPatentDetailComponent } from '../../src/patents/open-patent-detail/open-patent-detail.component';
import { PageNotFoundComponent } from 'toco-lib';
import { PatentsComponent } from './patents.component';
import { RegisterComponent } from '../../src/patents/register/register.component';
import { SearchComponent } from '../../src/patents/search/search.component';
import { SolicitarPatenteComponent } from '../../src/patents/solicitar-patente/solicitar-patente.component';

const routes: Routes = [
  {
    path: '',
    component: PatentsComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        children: [
          {
            path: 'search',
            component: SearchComponent,
          },
          {
            path: 'patent/:id',
            component: OpenPatentDetailComponent
          },
          {
            path: 'import',
            component: ImportPatentsComponent,
            canActivate: [AdminPermissionService]

          },
          {
            path: 'register',
            component: RegisterComponent,
            canActivate: [AdminPermissionService]
          },
          {
            path: 'create',
            component: SolicitarPatenteComponent,
            canActivate: [AdminPermissionService]
          },
          {
            path: 'editar/:id',
            component: SolicitarPatenteComponent,
            canActivate: [AdminPermissionService]
          },

          {
            path: 'help/about',
            component: HelpComponent
          },
          {
            path: 'help/contact',
            component: ContactComponent
          },
          {
            path: '**',
            component: PageNotFoundComponent,
          },
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatentsRoutingModule { }
