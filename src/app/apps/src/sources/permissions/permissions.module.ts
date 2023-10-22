import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule, OrganizationsModule, TocoFormsModule } from 'toco-lib';
import { SharedModule } from '../shared/shared.module';
import { MySourcesEditorComponent } from './editor/editor.component';
import { MySourcesManagerComponent, MySourcesManagerPermissionDialog } from './manager/manager.component';
import { MySourcesOrganizationsComponent, MySourcesOrganizationsPermissionDialog } from './organizations/organizations.component';
import { MySourcesOrganizationPermissionComponent } from './permission/organization-permission/organization-permission.component';
import { MySourcesSourcePermissionComponent } from './permission/source-permission/source-permission.component';
import { MySourcesTermPermissionComponent } from './permission/term-permission/term-permission.component';
import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { RoleComponent } from './role/role.component';
import { MySourcesTermsAdminComponent } from './terms-admin/terms-admin.component';
import { MySourcesTermsComponent, MySourcesTermsPermissionDialog } from './terms/terms.component';
import { UserSearchComponent } from './user-search/user-search.component';



@NgModule({
    declarations: [
        PermissionsComponent,
        MySourcesEditorComponent,
        MySourcesManagerComponent,
        MySourcesManagerPermissionDialog,
        MySourcesOrganizationsComponent,
        MySourcesOrganizationsPermissionDialog,
        MySourcesTermsAdminComponent,
        MySourcesTermsComponent,
        MySourcesTermsPermissionDialog,
        MySourcesSourcePermissionComponent,
        MySourcesOrganizationPermissionComponent,
        MySourcesTermPermissionComponent,
        UserSearchComponent,
        RoleComponent
    ],
    imports: [
        CommonModule,
        PermissionsRoutingModule,
        SharedModule,
        CoreModule,
        TocoFormsModule,
        OrganizationsModule,
        ReactiveFormsModule
    ]
})
export class PermissionsModule { }
