import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WikiAuthorProfileComponent } from './profiles/wiki-author-profile/wiki-author-profile.component';
import { WikiAuthorsProfileComponent } from './profiles/wiki-authors-profile/wiki-authors-profile.component';
import { WikiOrgEmployesProfileComponent } from './profiles/wiki-org-employes-profile/wiki-org-employes-profile.component';
import { WikiTopicProfileComponent } from './profiles/wiki-topic-profile/wiki-topic-profile.component';
import { WikiTopicsProfileComponent } from './profiles/wiki-topics-profile/wiki-topics-profile.component';
import { WikiVenueProfileComponent } from './profiles/wiki-venue-profile/wiki-venue-profile.component';
import { WikiWorkProfileComponent } from './profiles/wiki-work-profile/wiki-work-profile.component';
import { WikiOrganizationsComponent } from './wiki-organizations.component';

const routes: Routes = [

  {
    path: '',
    component: WikiOrganizationsComponent,
    children: [
      {
        path: 'organization',
        component: WikiOrgEmployesProfileComponent,
      },
      {
        path: 'author',
        component: WikiAuthorProfileComponent,
      },
      {
        path: 'authors',
        component: WikiAuthorsProfileComponent,
      },
      {
        path: 'work',
        component: WikiWorkProfileComponent,
      },
      {
        path: 'venue',
        component: WikiVenueProfileComponent,
      },
      {
        path: 'topic',
        component: WikiTopicProfileComponent,
      },
      {
        path: 'topics',
        component: WikiTopicsProfileComponent,
      },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiOrganizationsRoutingModule { }
