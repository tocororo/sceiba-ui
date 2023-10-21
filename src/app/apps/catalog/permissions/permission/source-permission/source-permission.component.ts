import { Component, Input, OnInit } from '@angular/core';
import { Source, User, SourceService } from 'toco-lib';

@Component({
  selector: 'catalog-source-permission',
  templateUrl: './source-permission.component.html',
  styleUrls: ['./source-permission.component.scss']
})
export class MySourcesSourcePermissionComponent implements OnInit {

  @Input() source: Source;

  editors: User[] = new Array<User>();
  managers: User[] = new Array<User>();

  user: User = null;

  constructor(private sourceService: SourceService) { }

  ngOnInit() {
    this.sourceService.permissionGetSourceEditors(this.source.id).subscribe(
      (response) => {
        console.log(response);
        this.editors = response.data.permission.users;
      },
      (err: any) => {
        console.log('error: ' + err + '.');
      },
      () => {
        console.log('complete');
      }
    );
    this.sourceService.permissionGetSourceManagers(this.source.id).subscribe(
      (response) => {
        console.log(response);
        this.managers = response.data.permission.users;
      },
      (err: any) => {
        console.log('error: ' + err + '.');
      },
      () => {
        console.log('complete');
      }
    );
  }
  selectedUser(user) {
    console.log(user);
    this.user = user;
  }

  grantEditor() {
    this.sourceService.permissionSetSourceEditor(this.source.id, this.user.id, true).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit();
      },
      (err: any) => {
      },
      () => {
      }
    );
    this.user = null;
  }
  grantManager() {
    console.log('save');
    this.sourceService.permissionSetSourceManager(this.source.id, this.user.id, true).subscribe(
      (response) => {
        console.log(response);
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
    this.sourceService.permissionSetSourceManager(this.source.id, user.id, false).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit();
      },
      (err: any) => {
      },
      () => {
      }
    );
  }
  denyEditor(user) {
    this.sourceService.permissionSetSourceEditor(this.source.id, user.id, false).subscribe(
      (response) => {
        console.log(response);
        this.ngOnInit();
      },
      (err: any) => {
      },
      () => {
      }
    );
  }


}
