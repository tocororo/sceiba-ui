import { CollectionViewer, SelectionChange } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, Injectable, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';

import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hit, Organization, OrganizationServiceNoAuth, OrganizationRelationships, OrganizationFlatNode } from 'toco-lib';



/** Flat node with expandable and level information */
export class DynamicFlatNode {
  constructor(public item: Hit<Organization>, public level = 1, public expandable = false,
    public isLoading = false) { }
}

@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
    private orgService: OrganizationServiceNoAuth) { }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.changed.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    node.isLoading = true;
    const index = this.data.indexOf(node);
    if (node.item.metadata.relationships.length <= 0 || index < 0) { // If no children, or cannot find the node, no op
      return;
    }
    if (expand) {
      this.orgService.getOrganizationRelationships(node.item.metadata.id, OrganizationRelationships.CHILD.value).subscribe(
        (response) => {
          const nodes = response.map(
            org =>
              new DynamicFlatNode(org, node.level + 1, org.metadata.relationships.length > 0)
          );

          this.data.splice(index + 1, 0, ...nodes);

          this.dataChange.next(this.data);
          node.isLoading = false;

        },
        (error) => { },
        () => { }
      );
    } else {
      let count = 0;
      for (let i = index + 1; i < this.data.length
        && this.data[i].level > node.level; i++) {
        count++
      }
      this.data.splice(index + 1, count);
      this.dataChange.next(this.data);
      node.isLoading = false;
    }
  }
}

@Component({
  selector: 'catalog-mysources-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class MySourcesOrganizationsComponent implements OnInit {

  @Input() organizations: Array<Hit<Organization>> = new Array();

  public error = false;

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;

  constructor(
    private orgService: OrganizationServiceNoAuth, public dialog: MatDialog) {
    // this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    // this.dataSource = new DynamicDataSource(this.treeControl, orgService);
  }

  ngOnInit() {
    // this.dataSource.data = this.organizations.map(
    //   org =>
    //     new DynamicFlatNode(org, 1, org.metadata.relationships.length > 0)
    // );

  }

  openPermission(org: OrganizationFlatNode) {
    console.log(org);
    this.dialog.open(MySourcesOrganizationsPermissionDialog, {
      width: "80%",
      data: {
        org: org.item.metadata,
      },
    });
  }

}



@Component({
  selector: "catalog-mysources-organizations-permissions",
  template: `<mat-dialog-content class="height-auto">
  <catalog-organization-permission [org]="org"></catalog-organization-permission>
  </mat-dialog-content>`,
})
export class MySourcesOrganizationsPermissionDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MySourcesOrganizationsPermissionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public org: Organization;


  ngOnInit(): void {
    this.org = this.data.org;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public ok() {
  }
}
