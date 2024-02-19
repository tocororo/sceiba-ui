import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Project } from "../project/person.entity";

@Component({
  selector: "app-people-view",
  templateUrl: "./project-view.component.html",
  styleUrls: ["./project-view.component.scss"],
})
export class ProjectViewComponent implements OnInit {
  constructor(private _activatedRoute: ActivatedRoute) {}

  public project: Project = null;

  ngOnInit() {
    this._activatedRoute.parent.data.subscribe((data) => {
      console.log(data);

      this.project = data.project.metadata;
    });
  }
}
