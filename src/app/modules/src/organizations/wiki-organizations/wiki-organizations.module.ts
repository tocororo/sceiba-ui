import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { SceibaUiSharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'toco-lib';
import { ExpansionPanelLayoutComponent } from './profile-layouts/expansion-panel-layout/expansion-panel-layout.component';
import { TableLayoutComponent } from './profile-layouts/table-layout/table-layout.component';
import { WikiAuthorProfileComponent } from './profiles/wiki-author-profile/wiki-author-profile.component';
import { WikiAuthorsProfileComponent } from './profiles/wiki-authors-profile/wiki-authors-profile.component';
import { WikiOrgEmployesProfileComponent } from './profiles/wiki-org-employes-profile/wiki-org-employes-profile.component';
import { WikiTopicProfileComponent } from './profiles/wiki-topic-profile/wiki-topic-profile.component';
import { WikiTopicsProfileComponent } from './profiles/wiki-topics-profile/wiki-topics-profile.component';
import { WikiVenueProfileComponent } from './profiles/wiki-venue-profile/wiki-venue-profile.component';
import { WikiWorkProfileComponent } from './profiles/wiki-work-profile/wiki-work-profile.component';
import { OrgSearchWikiComponent } from './wiki-org-search/wiki-org-search.component';
import { WikiOrganizationsRoutingModule } from './wiki-organizations-routing.module';
import { WikiOrganizationsComponent } from './wiki-organizations.component';


@NgModule({
  declarations: [

    WikiOrganizationsComponent,
    WikiOrgEmployesProfileComponent,
    TableLayoutComponent,
    OrgSearchWikiComponent,
    WikiAuthorProfileComponent,
    WikiWorkProfileComponent,
    WikiTopicProfileComponent,
    WikiVenueProfileComponent,
    WikiAuthorsProfileComponent,
    ExpansionPanelLayoutComponent,
    WikiTopicsProfileComponent,

  ],
  imports: [
    CommonModule,
    WikiOrganizationsRoutingModule,
    SceibaUiSharedModule,
    CoreModule,
    ReactiveFormsModule
  ]
})
export class WikiOrganizationsModule { }
