/*
 *   Copyright (c) 2020 Universidad de Pinar del Río 'Hermanos Saíz Montes de Oca'
 *   All rights reserved.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceibaUiPageNotFoundComponent } from 'src/app/core/sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';
import { NotificationListComponent, OauthAuthenticationService } from 'toco-lib';
import { HomeRevistasmesComponent } from '../../src/revistasmes/home/home.component';
import { SourceNoAuthResolver, SourceResolver } from '../../src/sources/_services/source-resolver';
import { StaticPagesComponent } from '../../src/sources/static-pages/static-pages.component';
import { UserProfileComponent } from '../../src/sources/user-profile/user-profile.component';
import { RevistasMesComponent } from './revistasmes.component';


const routes: Routes = [
  {
    path: "",
    component: RevistasMesComponent,
    children: [
      {
        path: 'directory',
        loadChildren: () => import('../../src/sources/catalog/catalog.module').then(m => m.CatalogModule),
        data: { topOrganizationPID: 'orgaid.223'},
        // component: CatalogComponent,
        // children: [
        //   {
        //     path: 'new',
        //     component: SourceInclusionComponent,
        //   },
        //   {
        //     path: ':uuid',
        //     component: SourceViewReadComponent,
        //     // canActivate: [SourceViewGuard],
        //     resolve: {
        //       source: SourceResolver,
        //     },
        //   },
        //   {
        //     path: ':uuid/view',
        //     component: SourceViewComponent,
        //     resolve: {
        //       source: SourceResolver,
        //     },
        //   },
        //   {
        //     path: ':uuid/edit',
        //     component: SourceEditComponent,
        //     resolve: {
        //       source: SourceResolver,
        //     },
        //   },
        // ]
        // canActivate: [OauthAuthenticationService]
      },
      {
        path: 'permissions',
        loadChildren: () => import('../../src/sources/permissions/permissions.module').then(m => m.PermissionsModule),
        canActivate: [OauthAuthenticationService]
      },
      {
        path: 'faq',
        component: StaticPagesComponent,
        data: { src: 'assets/markdown/revistasmes/revistasmes/faq', title: 'FAQ' },
      },
      {
        path: 'about',
        component: StaticPagesComponent,
        data: { src: 'assets/markdown/revistasmes/about', title: 'Sobre Nosotros' },
      },
      {
        path: 'help',
        component: StaticPagesComponent,
        data: { src: 'assets/markdown/revistasmes/help', title: 'Ayuda' },
      },
      {
        path: 'contact',
        component: StaticPagesComponent,
        data: { src: 'assets/markdown/revistasmes/contact', title: 'Contacto' },
      },
      {
        path: 'userprofile',
        component: UserProfileComponent,
        canActivate: [OauthAuthenticationService],
      },
      {
        path: 'notifications',
        component: NotificationListComponent,
        canActivate: [OauthAuthenticationService],
      },
      {
        path: '',
        component: HomeRevistasmesComponent,
      },
      {
        path: "**",
        component: SceibaUiPageNotFoundComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SourceResolver, SourceNoAuthResolver],
})
export class RevistasMesRoutingModule {}
