
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileEditComponent } from './user/user-profile-edit/user-profile-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const profileRoutes: Routes = [
	{
		path: '',
		children: [
		  {
			path: '',
			component: UserProfileComponent
		  },
		  {
			path: 'edit',
			component: UserProfileEditComponent
		  }
		],
		canActivate: []
	}
];

@NgModule({
	imports: [RouterModule.forChild(profileRoutes)],

	exports: [RouterModule]
})
export class ProfileRoutingModule
{ }
