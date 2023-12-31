
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceibaUiPageNotFoundComponent } from 'src/app/core/sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';
import { NotificationListComponent, OauthAuthenticationService } from 'toco-lib';
import { SourceNoAuthResolver, SourceResolver } from '../../src/sources/_services/source-resolver';
import { HomeComponent } from '../../src/sources/home/home.component';
import { StatisticsComponent } from '../../src/sources/statistics/statistics.component';
import { UserProfileComponent } from '../../src/sources/user-profile/user-profile.component';
import { SourcesComponent } from './sources.component';



const routes: Routes = [
  {
    path: "",
    component: SourcesComponent,
    children: [
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
        path: "**",
        component: SceibaUiPageNotFoundComponent,
      },
      // {
      //   path: 'inst-repo',
      //   loadChildren: () => import('./inst-repo/inst-repo.module').then(mod => mod.InstRepoModule),
      //   data: {
      //     preload: true  /* In orden to use a custom preloading strategy (`SelectiveModulesPreload`). */
      //   }
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [SourceResolver, SourceNoAuthResolver],
})
export class SoucesRoutingModule
{ }
