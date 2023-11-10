/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { FlatTreeControl } from "@angular/cdk/tree";
import { MatDialog } from "@angular/material/dialog";
import { MatTreeFlattener, MatTreeFlatDataSource } from "@angular/material/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { of } from "rxjs";
import { Term, Vocabulary, TermNode, TaxonomyService } from 'toco-lib';
import { MySourcesTermsPermissionDialog } from '../terms/terms.component';


export interface FlatTreeNode {
  name: string;
  level: number;
  expandable: boolean;
  term: Term;
}

@Component({
  selector: "catalog-mysources-terms-admin",
  templateUrl: "./terms-admin.component.html",
  styleUrls: ["./terms-admin.component.scss"]
})
export class MySourcesTermsAdminComponent
  implements OnInit {

  vocabularies: Vocabulary[];
  currentVocab = '';

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
    this.taxonomyService.getVocabularies().subscribe(
      // next
      (response: any) => {
        console.log(response);
        this.vocabularies = response.data.vocabularies;
      },

      // error
      (error: any) => {
        console.log(error);
      },
      // complete
      () => { }
    );

  }

  onVocabularyChange() {
    this.taxonomyService.getTermsTreeByVocab(this.currentVocab).subscribe(
      // next
      (response: any) => {
        console.log(response);
        this.dataSource.data = response.data.tree.term_node;
        this.data = response.data.tree.term_node;
        // this.vocabularies = response.data.vocabularies;
      },

      // error
      (error: any) => {
        console.log(error);
      },
      // complete
      () => { }
    );
  }

  remove_component() { }

  onChange() {
    console.log("ttree change");
  }


  /** Transform the data to something the tree can read. */
  transformer(node: TermNode, level: number) {
    return {
      name: node.term.description,
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

  openPermission(node) {
    this.dialog.open(MySourcesTermsPermissionDialog, {
      width: "80%",
      data: {
        term: node.term,
      },
    });
  }
}
