import { Component, Input, OnInit } from "@angular/core";
import { Project } from "../../project/person.entity";

@Component({
  selector: "app-other-tab",
  templateUrl: "./other-tab.component.html",
  styleUrls: ["./other-tab.component.scss"],
})
export class OtherTabComponent implements OnInit {
  @Input() public project: Project;

  constructor() {}

  ngOnInit() {}
}
