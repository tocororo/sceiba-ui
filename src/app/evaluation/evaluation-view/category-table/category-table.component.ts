import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";

@Component({
  selector: "app-category-table",
  templateUrl: "./category-table.component.html",
  styleUrls: ["./category-table.component.scss"],
})
export class CategoryTableComponent implements OnInit {
  @Input() public categoryInfo: any;

  displayedColumns: string[] = ["question", "answer"];
  // List evaluations
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.categoryInfo);
  }
}
