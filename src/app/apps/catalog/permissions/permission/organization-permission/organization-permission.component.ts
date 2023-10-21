import { Component, Input, OnInit } from '@angular/core';
import { Organization, User, SourceService } from 'toco-lib';


@Component({
  selector: 'catalog-organization-permission',
  templateUrl: './organization-permission.component.html',
  styleUrls: ['./organization-permission.component.scss']
})
export class MySourcesOrganizationPermissionComponent implements OnInit {

  @Input() org: Organization;
  managers: User[] = new Array<User>();

  constructor(private sourceService: SourceService) { }

  user: User = null;
  ngOnInit() {
    console.log(this.org)
    this.sourceService.permissionGetOrganizationManagers(this.org.id).subscribe(
      (response) => {
        this.managers = response.data.permission.users;
      },
      (err: any) => {},
      () => {}
    );
  }
  selectedUser(user) {
    this.user = user;
  }

  grantManager() {
    this.sourceService.permissionSetOrganizationManager(this.org.id, this.user.id, true).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err: any) => {
      },
      () => {
      }
    );
    this.user = null;
  }
  denyManager(user) {
    this.sourceService.permissionSetOrganizationManager(this.org.id, user.id, false).subscribe(
      (response) => {
        this.ngOnInit();
      },
      (err: any) => {
      },
      () => {
      }
    );
  }
}
