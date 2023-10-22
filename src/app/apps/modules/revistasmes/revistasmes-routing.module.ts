/*
 *   Copyright (c) 2020 Universidad de Pinar del Río 'Hermanos Saíz Montes de Oca'
 *   All rights reserved.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent, OauthAuthenticationService } from 'toco-lib';
import { HomeRevistasmesComponent } from '../../src/revistasmes/home/home.component';
import { SourceResolver } from '../../src/sources/source-resolver';
import { StaticPagesComponent } from '../../src/sources/static-pages/static-pages.component';
import { UserProfileComponent } from '../../src/sources/user-profile/user-profile.component';


const routes: Routes = [
  {
    path: 'sources',
    loadChildren: () => import('../../src/sources/catalog/catalog.module').then(m => m.CatalogModule),
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
    data: { src: 'assets/markdown/faq', title: 'FAQ' },
  },
  {
    path: 'about',
    component: StaticPagesComponent,
    data: { src: 'assets/markdown/about', title: 'Sobre Nosotros' },
  },
  {
    path: 'help',
    component: StaticPagesComponent,
    data: { src: 'assets/markdown/help', title: 'Ayuda' },
  },
  {
    path: 'contact',
    component: StaticPagesComponent,
    data: { src: 'assets/markdown/contact', title: 'Contacto' },
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
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SourceResolver],
})
export class RevistasMesRoutingModule {}
