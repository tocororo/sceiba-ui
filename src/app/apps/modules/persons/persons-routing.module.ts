
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PageNotFoundPeopleComponent } from './page-not-found-people/page-not-found-people.component';
import { SearchComponent } from './search/search.component';
import {PeopleViewComponent} from "./people-view/people-view.component";
import {Layouts} from "./app.component";
import { ImportPeopleComponent } from './import-people/import-people.component';
import { PeopleActiveResolverService } from './people/people-resolver';
import { PeopleLayoutComponent } from './layout/people-layout/people-layout.component';
import { MainlayoutComponent } from './layout/mainlayout/mainlayout.component';

const routes: Routes = [
	// {
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        // data: { layout: Layouts.Main },
      },
      {
        path: 'search',
        component: SearchComponent,
        // data: { layout: Layouts.Main },
      },
      {
        path: 'import',
        component: ImportPeopleComponent,
        data: { layout: Layouts.Main },
      }
    ],
  },
  {
    path: 'person/:uuid',
    component: PeopleLayoutComponent,
    resolve: {
      'person': PeopleActiveResolverService
    },
    children: [
      {
        path: 'view',
        component: PeopleViewComponent,
        // data: { layout: Layouts.People },

      }]
  },
	// {
	// 	path: '**',
	// 	component: PageNotFoundPeopleComponent
	// }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule
{ }
