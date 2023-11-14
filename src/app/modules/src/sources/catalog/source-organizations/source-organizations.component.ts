import { Component, Inject, Input, OnChanges, OnInit } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SceibaUiOrgSearchDialogComponent } from 'src/app/modules/common/search/org-search-dialog/org-dialog.component';
import {
  HandlerComponent,
  Hit,
  MessageHandler,
  Organization,
  OrganizationFlatNode,
  OrganizationRelationships,
  OrganizationServiceNoAuth,
  Relationship,
  SourceData,
  SourceOrganization,
  SourceOrganizationRole,
  StatusCode,
} from 'toco-lib';

@Component({
  selector: 'catalog-source-edit-organizations',
  templateUrl: './source-organizations.component.html',
  styleUrls: ['./source-organizations.component.scss'],
})
export class SourceEditOrganizationsComponent implements OnInit, OnChanges {
  @Input()
  public sourceData: SourceData;

  @Input()
  public editable: boolean = true;

  @Input()
  public topMainOrganization: Hit<Organization> = null;

  public roles = SourceOrganizationRole;
  constructor(
    public dialog: MatDialog,
    private orgService: OrganizationServiceNoAuth
  ) {}

  ngOnInit() {
    // solo las organizaciones con algun rol son validas
    this.sourceData.organizations = this.sourceData.organizations.filter(
      (element) => element && element.role
    );
    console.log(
      '**** SourceEditOrganizationsComponent *** complete process initIndexes',
      this.sourceData
    );
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  addOrg(cuban = true, topMain = false) {
    const dialogRef = this.dialog.open(SceibaUiOrgSearchDialogComponent, {
      height: '90%',
      data: {cuban:false, multiple:true},
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
    });
    // if (topMain && this.topMainOrganization) {
    //   this.dialog.open(SourceEditOrganizationSelectTopDialog, {
    //     width: "500px",
    //     data: {
    //       topMainOrganization: this.topMainOrganization,
    //       selectOrg: (org: Organization, parents: Array<Organization>) => {
    //         this.addOrgToSource(org, SourceOrganizationRole.MAIN.value);
    //         parents.forEach((element) => {
    //           this.addOrgToSource(
    //             element,
    //             SourceOrganizationRole.COLABORATOR.value
    //           );
    //         });
    //       },
    //     },
    //   });
    // } else {
    //   this.dialog.open(SourceEditOrganizationSelectDialog, {
    //     width: "500px",
    //     data: {
    //       filter: cuban ? { type: "country", value: "Cuba" } : null,
    //       canSelectRole: this.topMainOrganization == null,
    //       selectOrg: (
    //         org: Organization,
    //         role,
    //         parents: Array<Organization>
    //       ) => {
    //         this.addOrgToSource(org, role);
    //         parents.forEach((element) => {
    //           this.addOrgToSource(
    //             element,
    //             SourceOrganizationRole.COLABORATOR.value
    //           );
    //         });
    //       },
    //     },
    //   });
    // }
  }
  private addOrgToSource(org: Organization, role) {
    if (!this.sourceData.organizations.find((o) => o.id == org.id)) {
      let selected = new SourceOrganization();
      selected.deepcopy(org);
      selected.role = role;
      this.sourceData.organizations.push(selected);
      if (SourceOrganizationRole.MAIN.value == role) {
        this.setAsMain(org);
      }
    }
  }
  setAsMain(organization: Organization) {
    this.sourceData.organizations.forEach((element) => {
      if (organization.id == element.id) {
        element.role = SourceOrganizationRole.MAIN.value;
      } else {
        element.role = SourceOrganizationRole.COLABORATOR.value;
      }
    });
  }

  removeInst(index) {
    const organization = this.sourceData.organizations[index];
    const m = new MessageHandler(null, this.dialog);
    const child = this.childToRemove(organization);
    if (child == null) {
      let parents = this.getOrgToDelete(organization);
      let toDelete = [];
      let msg = '';
      for (let i = 0; i < parents.length; i++) {
        const element = parents[i];
        toDelete.push(this.sourceData.organizations[element]);
        msg += this.sourceData.organizations[element].name + ', ';
      }
      toDelete.push(organization);
      console.log(toDelete);
      if (toDelete.length > 0) {
        m.showMessage(
          StatusCode.OK,
          msg,
          HandlerComponent.dialog,
          'Se eliminó también: '
        );
      }

      let orgs = [];
      for (let i = 0; i < this.sourceData.organizations.length; i++) {
        if (
          !toDelete.find((o) => o.id == this.sourceData.organizations[i].id)
        ) {
          orgs.push(this.sourceData.organizations[i]);
        }
      }
      console.log(orgs);
      this.sourceData.organizations = orgs;
      // this.sourceData.organizations = this.sourceData.organizations.filter(
      //   (o) => o.id != organization.id
      // );
    } else {
      m.showMessage(
        StatusCode.OK,
        child.name,
        HandlerComponent.dialog,
        'Para eliminar este elemento debe eliminar:'
      );
    }
  }

  private childToRemove(org: Organization) {
    // se puede eliminar si no tiene hijos en el sourceData.organizations
    let result = true;

    if (org.relationships) {
      for (let index = 0; index < org.relationships.length; index++) {
        const element = org.relationships[index];
        if (element.type == OrganizationRelationships.CHILD.value) {
          const childIndex = this.getIndexByPid(element.identifiers[0].value);
          if (childIndex != null) {
            return this.sourceData.organizations[childIndex];
          }
        }
      }
      return null;
    }
  }
  // removeInst(index) {
  //   let toDelete = []
  //   toDelete.push(index);
  //   toDelete.concat(this.getOrgToDelete(this.sourceData.organizations[index]));
  //   let orgs = [];
  //   for (let i = 0; i < this.sourceData.organizations.length; i++) {
  //     if(!toDelete.find((o) => o == i)){
  //       orgs.push(this.sourceData.organizations[i]);
  //     }
  //   }
  //   this.sourceData.organizations = orgs;
  // }

  private getOrgToDelete(org: Organization) {
    let toDelete = [];
    if (org.relationships) {
      org.relationships.forEach((element) => {
        if (element.type == OrganizationRelationships.PARENT.value) {
          const parentIndex = this.getIndexByPid(element.identifiers[0].value);
          if (parentIndex) {
            toDelete.push(parentIndex);
            toDelete.concat(
              this.getOrgToDelete(this.sourceData.organizations[parentIndex])
            );
          }
        }
      });
    }

    return toDelete;
  }

  private getIndexByPid(pid) {
    for (let index = 0; index < this.sourceData.organizations.length; index++) {
      const element = this.sourceData.organizations[index];
      for (
        let pidindex = 0;
        pidindex < element.identifiers.length;
        pidindex++
      ) {
        const identifier = element.identifiers[pidindex];
        console.log(identifier.value + '==' + pid);
        if (identifier.value == pid) {
          console.log(identifier.value + '==' + pid + '  iguales!!!');
          return index;
        }
      }
    }
    return null;
  }
}

@Component({
  selector: 'catalog-source-organizations-select-top-main',
  template: `<mat-dialog-content class="height-auto">
    <ng-container *ngIf="selectedOrg">
      <mat-label>Principal: </mat-label>
      <br />
      <mat-label>{{ selectedOrg.metadata.name }}</mat-label>
      <br />
    </ng-container>

    <ng-container *ngIf="parents.length > 0">
      <mat-label>Colaboradores: </mat-label>
      <ng-container *ngFor="let item of parents">
        <br />
        <mat-label>{{ item.name }}</mat-label>
        <br />
      </ng-container>
      <br />
    </ng-container>

    <toco-org-tree-viewer
      [organizations]="[topMainOrganization]"
      [orgRelationshipType]="'child'"
      [iconAction]="'done'"
      [labelAction]="'Seleccionar'"
      (action)="selectOrg($event)"
      [ngStyle]="{ height: '300px', overflow: 'auto' }"
    >
    </toco-org-tree-viewer>
    <button mat-raised-button (click)="ok()">OK</button>
  </mat-dialog-content>`,
})
export class SourceEditOrganizationSelectTopDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SourceEditOrganizationSelectTopDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public topMainOrganization: Hit<Organization> = null;
  public toSelect: Array<Relationship> = null;
  public selected = -1;

  public selectedOrg: Hit<Organization> = null;
  public parents: Array<Organization> = new Array<Organization>();

  ngOnInit(): void {
    this.topMainOrganization = this.data.topMainOrganization;
    this.toSelect = new Array<Relationship>();
    this.topMainOrganization.metadata.relationships.forEach((element) => {
      if (element.type == OrganizationRelationships.CHILD.value) {
        this.toSelect.push(element);
      }
    });
    console.log(this.toSelect);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  selectOrg(org: OrganizationFlatNode) {
    this.selectedOrg = org.item;
    this.parents = new Array<Organization>();
    this.addParents(org);
  }

  private addParents(org: OrganizationFlatNode) {
    if (org.parent != null) {
      this.parents.push(org.parent.item.metadata);
      this.addParents(org.parent);
    }
    // child.relationships.forEach((p) => {
    //   if (p.type == OrganizationRelationships.PARENT.value) {
    //     if (p.identifiers.length > 0 && p.identifiers[0].value) {
    //       this.orgService
    //         .getOrganizationByPID(p.identifiers[0].value)
    //         .subscribe({
    //           next: (response) => {
    //             console.log(response);
    //             this.parents.push(response.metadata);
    //             this.addParents(response.metadata);
    //           },
    //         });
    //     }
    //   }
    // });
  }

  public ok() {
    // let selected = new SourceOrganization()
    // selected.organization = org;
    // selected.role = SourceOrganizationRole.MAIN.value;
    if (this.selectedOrg) {
      this.data.selectOrg(this.selectedOrg.metadata, this.parents);
      this.dialogRef.close();
      // console.log(this.toSelect[this.selected]);
      // this.orgService
      //   .getOrganizationByPID(this.toSelect[this.selected].identifiers[0].value)
      //   .subscribe({
      //     next: (response) => {
      //       this.data.selectOrg(response.metadata, [this.topMainOrganization]);
      //       this.dialogRef.close();
      //     },
      //   });
    }
  }
}

@Component({
  selector: 'catalog-source-organizations-select-dialog',
  template: `<mat-dialog-content class="height-auto">
    <toco-org-search
      [orgFilter]="data.filter"
      (selectedOrg)="selectedOrg($event)"
      [placeholder]="placeholder"
    >
    </toco-org-search>
    <br />
    <mat-label *ngIf="org">{{ org.name }}</mat-label>
    <br />
    <mat-form-field *ngIf="canSelectRole">
      <mat-label>Rol</mat-label>
      <mat-select [(value)]="role" required>
        <mat-option *ngFor="let item of roles" value="{{ item.value }}">{{
          item.label
        }}</mat-option>
      </mat-select>
    </mat-form-field>

    <br />

    <ng-container *ngIf="parents.length > 0">
      <mat-label>Se añadirá también: </mat-label>
      <ng-container *ngFor="let item of parents">
        <br />
        <mat-label>{{ item.name }}</mat-label>
        <br />
      </ng-container>
      <br />
    </ng-container>

    <button mat-raised-button (click)="ok()">OK</button>
  </mat-dialog-content>`,
})
export class SourceEditOrganizationSelectDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SourceEditOrganizationSelectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private orgService: OrganizationServiceNoAuth
  ) {}

  public roles = [
    { label: 'Principal', value: 'MAIN' },
    { label: 'Colaborador', value: 'COLABORATOR' },
  ];
  public role = null;
  public org: Organization;
  public parents: Array<Organization> = new Array<Organization>();
  placeholder = 'Buscar una organización';
  public canSelectRole = true;

  ngOnInit(): void {
    console.log(this.data);
    this.canSelectRole = this.data.canSelectRole;
    if (this.data.filter) {
      this.placeholder = 'Buscar una organización cubana';
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public selectedOrg(org?: Organization): void {
    console.log(org);
    this.org = org;
    this.addParent(this.org);
  }
  private addParent(child: Organization) {
    child.relationships.forEach((p) => {
      if (p.type == OrganizationRelationships.PARENT.value) {
        if (p.identifiers.length > 0 && p.identifiers[0].value) {
          this.orgService
            .getOrganizationByPID(p.identifiers[0].value)
            .subscribe({
              next: (response) => {
                console.log(response);
                this.parents.push(response.metadata);
                this.addParent(response.metadata);
              },
            });
        }
      }
    });
  }
  public ok() {
    // let selected = new SourceOrganization()
    // selected.organization = org;
    // selected.role = SourceOrganizationRole.MAIN.value;
    if (this.canSelectRole) {
      if (this.role) {
        this.data.selectOrg(this.org, this.role, this.parents);
        this.dialogRef.close();
      }
    } else {
      this.data.selectOrg(
        this.org,
        SourceOrganizationRole.COLABORATOR.value,
        this.parents
      );
      this.dialogRef.close();
    }
  }
}
