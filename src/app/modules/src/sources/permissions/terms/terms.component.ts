import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { of } from 'rxjs';
import { TaxonomyService, Term, TermNode } from 'toco-lib';



export interface FlatTreeNode {
  name: string;
  level: number;
  expandable: boolean;
  term: Term;
}


@Component({
  selector: 'catalog-mysources-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class MySourcesTermsComponent implements OnInit {

  @Input() terms: Term[];
  data: TermNode[];

  // internalControl = new FormControl();

  treeControl: FlatTreeControl<FlatTreeNode>;
  treeFlattener: MatTreeFlattener<TermNode, FlatTreeNode>;
  dataSource: MatTreeFlatDataSource<TermNode, FlatTreeNode>;

  constructor(private taxonomyService: TaxonomyService, public dialog: MatDialog) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  ngOnInit() {
    this.data = new Array<TermNode>();
    if (this.terms){
      for (let index = 0; index < this.terms.length; index++) {
        const term = this.terms[index];
        this.taxonomyService.getTermByUUID(term.uuid, 10).subscribe(
          // next
          (response: any) => {
            console.log(index, this.data)
            this.data.push(response.data.term_node);
            if (index == this.terms.length - 1) {
              this.dataSource.data = this.data;
              console.log(this.data)
            }
          },
          (error: any) => {},
          () => {}
        );
      }
      this.terms.forEach(term  => {

      });
    }

  }


  /** Transform the data to something the tree can read. */
  transformer(node: TermNode, level: number) {
    return {
        name: node.term.description + ' - [' + node.term.identifier + ']',
        term: node.term,
        level: level,
        expandable: (node.children.length > 0)
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: TermNode) {
    return of(node.children);
  }

  /* Get the parent node of a node */
  getParentNode(node: FlatTreeNode): FlatTreeNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  openPermission(node){
    this.dialog.open(MySourcesTermsPermissionDialog, {
      width: "80%",
      data: {
        term: node.term,
      },
    });
  }


}


@Component({
  selector: "catalog-mysources-terms-permissions",
  template: `<mat-dialog-content class="height-auto">
  <catalog-term-permission [term]="term"></catalog-term-permission>
  </mat-dialog-content>`,
})
export class MySourcesTermsPermissionDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MySourcesTermsPermissionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public term: Term;


  ngOnInit(): void {
    this.term = this.data.term;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public ok() {
  }
}
