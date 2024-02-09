import { Component, Input, OnInit } from "@angular/core";
import { Project } from "../../project/person.entity";

@Component({
  selector: "app-general-tab",
  templateUrl: "./general-tab.component.html",
  styleUrls: ["./general-tab.component.scss"],
})
export class GeneralTabComponent implements OnInit {
  @Input() public project: Project;
  displayedColumns: string[];

  constructor() {
    this.displayedColumns = ["Nombre", "Id Subvención", "URI Subvención"];
  }

  ngOnInit() {}
}
