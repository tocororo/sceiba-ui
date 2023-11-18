import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../src/organizations/_services/org.service';
import {
  OrganizationActiveResolverService,
  OrganizationDetailResolverService,
} from '../../src/organizations/_services/organization-detail-resolver.service.ts';
import {
  AdminPermissionService,
  CuratorPermissionService,
} from '../../src/organizations/_services/permission.service';
import { HomeComponent } from '../../src/organizations/home/home.component';
import { ImportComponent } from '../../src/organizations/import/import.component';
import { NotificationsComponent } from '../../src/organizations/notifications/notifications.component';
import { OrgEditComponent } from '../../src/organizations/org-edit/org-edit.component';
import { OrgReviewerComponent } from '../../src/organizations/org-reviewer/org-reviewer.component';
import { OrgViewerComponent } from '../../src/organizations/org-viewer/org-viewer.component';
import { RequestChangesListComponent } from '../../src/organizations/request-changes-list/request-changes-list.component';
import { OrganizationSearchComponent } from '../../src/organizations/search/search.component';
// import { SimpleAuthenticationService, OrgAddComponent } from 'toco-lib';
import { SceibaUiPageNotFoundComponent } from 'src/app/core/sceiba-ui-page-not-found/sceiba-ui-page-not-found.component';
import { OauthAuthenticationService } from 'toco-lib';
import { ErrorPageComponent } from '../../src/organizations/error-page/error-page.component';
import { OrganizationsComponent } from './organizations.component';

const routes: Routes = [
  {
    path: '',
    component: OrganizationsComponent,
    children: [
      {
        path: ':uuid/view',
        component: OrgViewerComponent,
        resolve: {
          org: OrganizationActiveResolverService,
        },
      },
      {
        path: ':uuid/edit',
        component: OrgEditComponent,
        resolve: {
          org: OrganizationDetailResolverService,
        },
        // canActivate: [OauthAuthenticationService, CuratorPermissionService, AdminPermissionService]
      },
      {
        path: ':uuid/request-changes',
        component: OrgEditComponent,
        resolve: {
          org: OrganizationDetailResolverService,
        },
      },
      {
        path: ':uuid/review-changes',
        component: OrgReviewerComponent,
        resolve: {
          org: OrganizationDetailResolverService,
        },
        // canActivate: [OauthAuthenticationService, CuratorPermissionService, AdminPermissionService]
      },
      {
        path: 'requests-list',
        component: RequestChangesListComponent,
        // resolve: {
        // 	'org': OrganizationDetailResolverService
        // },
        // canActivate: [OauthAuthenticationService, CuratorPermissionService, AdminPermissionService]
      },
      // {
      //     path: 'add',
      //     component: OrgAddComponent
      // },
      {
        path: 'search',
        component: OrganizationSearchComponent,
      },
      {
        path: 'disambiguate',
        // component: DisambiguateComponent,
        loadChildren: () => import('../../src/organizations/disambiguate/disambiguate.module').then(m => m.DisambiguateModule),
        canActivate: [
          OauthAuthenticationService,
          CuratorPermissionService,
          AdminPermissionService,
        ],
      },
      {
        path: 'import',
        component: ImportComponent,
        canActivate: [OauthAuthenticationService, AdminPermissionService],
      },
      {
        path: 'error',
        component: ErrorPageComponent,
      },
      {
        path: '',
        component: HomeComponent,
      },

      /*
      Perfiles
      */
      {
        path: 'wiki-organizations',
        // component: DisambiguateComponent,
        loadChildren: () => import('../../src/organizations/wiki-organizations/wiki-organizations.module').then(m => m.WikiOrganizationsModule),
      },
      /*
      end of Perfiles
      */
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: "**",
        component: SceibaUiPageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [UserService, CuratorPermissionService, AdminPermissionService],
})
export class OrganizationsRoutingModule {}
