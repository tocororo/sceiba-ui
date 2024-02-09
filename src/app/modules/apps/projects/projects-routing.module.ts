import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { MainlayoutComponent } from '../../src/projects/layout/mainlayout/mainlayout.component';
import { HomeComponent } from '../../src/projects/home/home.component';
import { SearchComponent } from '../../src/projects/search/search.component';
import { ImportPeopleComponent } from '../../src/projects/import-project/import-people.component';
import { PeopleLayoutComponent } from '../../src/projects/layout/project-layout/project-layout.component';
import { PeopleActiveResolverService } from '../../src/projects/project/people-resolver';
import { ProjectViewComponent } from '../../src/projects/project-view/project-view.component';
import { AdminPermissionService } from '../../src/projects/services/permission.service';
import { UpdateProjectComponent } from '../../src/projects/update-project/update-dialog.component';
import { NewProjectComponent } from '../../src/projects/new-project/new-dialog.component';
import { PageNotFoundPeopleComponent } from '../../src/projects/page-not-found-project/page-not-found-people.component';

const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "search",
        component: SearchComponent,
      },
      {
        path: "import",
        component: ImportPeopleComponent,
        // data: { layout: Layouts.Main },
      },
    ]
  },
  {
    path: "project/:uuid",
    component: PeopleLayoutComponent,
    resolve: {
      project: PeopleActiveResolverService,
    },
    children: [
      {
        path: "view",
        component: ProjectViewComponent,
        // data: { layout: Layouts.People },
      },
    ],
    canActivate: [AdminPermissionService],
  },
  {
    path: "edit/:id",
    component: MainlayoutComponent,
    children: [
      {
        path: "",
        component: UpdateProjectComponent,
      },
    ],
  },
  {
    path: "new",
    component: MainlayoutComponent,
    children: [
      {
        path: "",
        component: NewProjectComponent,
      },
    ],
  },
  {
    path: "**",
    component: PageNotFoundPeopleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }
