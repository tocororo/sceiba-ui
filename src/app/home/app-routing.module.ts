
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundSceibaComponent } from './page-not-found-sceiba/page-not-found-sceiba.component';


const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: ':uuid/view',
      loadChildren: () => import('./record/record.module').then(mod => mod.RecordModule),
      // data: {
      // 	preload: true  /* In orden to use a custom preloading strategy (`SelectiveModulesPreload`). */
      // }
    },
    {
      path: 'search',
      loadChildren: () => import('./search/search.module').then(mod => mod.SearchPageModule),
    },
    {
      path: 'profile',
      loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule),
      canActivate: []
    },
    {
      path: 'help',
      loadChildren: () => import('./help/help.module').then(mod => mod.HelpModule),
    },
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: '**',
      component: PageNotFoundSceibaComponent
    }
  ]
}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
