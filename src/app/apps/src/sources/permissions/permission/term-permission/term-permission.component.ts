import { Component, Input, OnInit } from '@angular/core';
import { Term, User, SourceService } from 'toco-lib';

@Component({
  selector: 'catalog-term-permission',
  templateUrl: './term-permission.component.html',
  styleUrls: ['./term-permission.component.scss']
})
export class MySourcesTermPermissionComponent implements OnInit {

  @Input() term: Term;
  managers: User[] = new Array<User>();

  constructor(private sourceService: SourceService) { }

  user: User = null;
  ngOnInit() {
    console.log(this.term)
    this.sourceService.permissionGetTermManagers(this.term.uuid).subscribe(
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
    this.sourceService.permissionSetTermManager(this.term.uuid, this.user.id, true).subscribe(
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
    this.sourceService.permissionSetTermManager(this.term.uuid, user.id, false).subscribe(
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
