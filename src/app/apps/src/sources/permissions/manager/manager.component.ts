import { Component, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Environment, Source } from 'toco-lib';

@Component({
  selector: "catalog-mysources-manager",
  templateUrl: "./manager.component.html",
  styleUrls: ["./manager.component.scss"],
})
export class MySourcesManagerComponent implements OnInit {
  displayedColumns: string[] = ["name", "source_status", "actions"];
  managerDataSource = null;

  managerLength = 0;


  @ViewChild("managerPaginator", { read: MatPaginator, static: true })
  managerPaginator: MatPaginator;
  @ViewChild("managerSort", {read: MatSort, static: true}) managerSort: MatSort;

  @Input() asManager: Array<Source>;

  public env: Environment;
  public constructor(private environment: Environment,
    public dialog: MatDialog) {
        this.env = this.environment;
    }


  loading = true;

  private init() {
    this.managerDataSource = new MatTableDataSource(
      this.asManager
    );

    this.managerLength = this.asManager.length;
    this.managerDataSource.paginator = this.managerPaginator;
    this.managerDataSource.sort = this.managerSort;
    console.log(this.managerPaginator, this.managerDataSource);
    this.loading = false;
  }

  ngOnInit() {
    this.init();
  }

  managerApplyFilter(filterValue: string) {
    this.managerDataSource.filter = filterValue.trim().toLowerCase();
  }

  openPermission(source: Source){
    this.dialog.open(MySourcesManagerPermissionDialog, {
      width: "80%",
      data: {
        source: source,
      },
    });
  }

}

@Component({
  selector: "catalog-mysources-manager-permissions",
  template: `<mat-dialog-content class="height-auto">
  <catalog-source-permission [source]="source"></catalog-source-permission>
  </mat-dialog-content>`,
})
export class MySourcesManagerPermissionDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MySourcesManagerPermissionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public source: Source;


  ngOnInit(): void {
    this.source = this.data.source;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public ok() {
  }
}
