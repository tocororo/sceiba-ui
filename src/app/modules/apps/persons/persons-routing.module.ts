import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SceibaUiPageNotFoundComponent } from 'src/app/core/sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';
import { HomeComponent } from '../../src/persons/home/home.component';
import { ImportPeopleComponent } from '../../src/persons/import-people/import-people.component';
import { MainlayoutComponent } from '../../src/persons/layout/mainlayout/mainlayout.component';
import { PeopleLayoutComponent } from '../../src/persons/layout/people-layout/people-layout.component';
import { PeopleViewComponent } from '../../src/persons/people-view/people-view.component';
import { PeopleActiveResolverService } from '../../src/persons/people/people-resolver';
import { SearchComponent } from '../../src/persons/search/search.component';
import { Layouts, PersonsComponent } from './persons.component';

const routes: Routes = [
  {
    path: '',
    component: PersonsComponent,
    children: [
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
          },
        ],
      },
      {
        path: 'person/:uuid',
        component: PeopleLayoutComponent,
        resolve: {
          person: PeopleActiveResolverService,
        },
        children: [
          {
            path: 'view',
            component: PeopleViewComponent,
            // data: { layout: Layouts.People },
          },
        ],
      },
      {
        path: '**',
        component: SceibaUiPageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonsRoutingModule {}
