import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceibaUiHomeComponent } from './core/home/home.component';
import { SceibaUiPageNotFoundComponent } from './core/sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';

const routes: Routes = [
  {
    path: "evaluations",
    loadChildren: () =>
      import("./apps/modules/evaluations/evaluations.module").then((mod) => mod.EvaluationsAppModule)
  },
  {
    path: "organizations",
    loadChildren: () =>
      import("./apps/modules/organizations/organizations.module").then((mod) => mod.OrganizationsAppModule),
  },
  {
    path: "persons",
    loadChildren: () =>
      import("./apps/modules/persons/persons.module").then((mod) => mod.PersonsAppModule),
  },
  {
    path: "revistasmes",
    loadChildren: () =>
      import("./apps/modules/revistasmes/revistasmes.module").then((mod) => mod.RevistasMesAppModule),
  },
  {
    path: "catalog",
    loadChildren: () =>
      import("./apps/modules/sources/sources.module").then((mod) => mod.SolurcesAppModule),
  },
  {
    path: "records",
    loadChildren: () =>
      import("./apps/modules/records/records.module").then((mod) => mod.RecordsAppModule),
  },
  {
    path: '',
    component: SceibaUiHomeComponent,
  },
  {
    path: "**",
    component: SceibaUiPageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
