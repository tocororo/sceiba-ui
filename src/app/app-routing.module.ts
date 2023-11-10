import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SceibaUiHomeComponent } from './core/home/home.component';
import { SceibaUiPageNotFoundComponent } from './core/sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';

const routes: Routes = [
  {
    path: "evaluations",
    loadChildren: () =>
      import("./modules/apps/evaluations/evaluations.module").then((mod) => mod.EvaluationsAppModule)
  },
  {
    path: "organizations",
    loadChildren: () =>
      import("./modules/apps/organizations/organizations.module").then((mod) => mod.OrganizationsAppModule),
  },
  {
    path: "persons",
    loadChildren: () =>
      import("./modules/apps/persons/persons.module").then((mod) => mod.PersonsAppModule),
  },
  {
    path: "revistasmes",
    loadChildren: () =>
      import("./modules/apps/revistasmes/revistasmes.module").then((mod) => mod.RevistasMesAppModule),
  },
  {
    path: "catalog",
    loadChildren: () =>
      import("./modules/apps/sources/sources.module").then((mod) => mod.SolurcesAppModule),
  },
  {
    path: "records",
    loadChildren: () =>
      import("./modules/apps/records/records.module").then((mod) => mod.RecordsAppModule),
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
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
