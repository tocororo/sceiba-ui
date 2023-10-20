
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { TocoFormsModule } from 'toco-lib';
import { SharedModule } from '../shared/shared.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { InputFileAvatarComponent } from './user/input-file-avatar/input-file-avatar.component';
import { InputOrgSearchComponent } from './user/input-org-search/input-org-search.component';
import { UserProfileEditComponent } from './user/user-profile-edit/user-profile-edit.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

@NgModule({
	declarations: [
		InputFileAvatarComponent,
		InputOrgSearchComponent,
		UserProfileComponent,
		UserProfileEditComponent
	],
	imports: [
    ReactiveFormsModule,
		CommonModule,
		ProfileRoutingModule,
    TocoFormsModule,
    SharedModule
	]
})
export class ProfileModule
{ }
