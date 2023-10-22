
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationListComponent, OauthAuthenticationService } from 'toco-lib';
import { SourceResolver } from '../../src/sources/_services/source-resolver';
import { HomeComponent } from '../../src/sources/home/home.component';
import { StaticPagesComponent } from '../../src/sources/static-pages/static-pages.component';
import { StatisticsComponent } from '../../src/sources/statistics/statistics.component';
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
    path: 'harvester',
    loadChildren: () => import('../../src/sources/harvester/harvester.module').then(m => m.HarvesterModule) ,
    canActivate: [OauthAuthenticationService]
  },{
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
    canActivate: [OauthAuthenticationService]
  },
  {
    path: 'statistics',
    component: StatisticsComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
  // {
  //   path: 'inst-repo',
  //   loadChildren: () => import('./inst-repo/inst-repo.module').then(mod => mod.InstRepoModule),
  //   data: {
  //     preload: true  /* In orden to use a custom preloading strategy (`SelectiveModulesPreload`). */
  //   }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SourceResolver],
})
export class SoucesRoutingModule
{ }
