import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../../project/people.service";
import { Project } from "../../project/person.entity";
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialogComponent } from "../../dialogs/delete/delete-dialog.component";

@Component({
  selector: "app-project-layout",
  templateUrl: "./project-layout.component.html",
  styleUrls: ["./project-layout.component.scss"],
})
export class PeopleLayoutComponent implements OnInit {
  public project: Project;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    public dialog: MatDialog,
    public router: Router
  ) {}

  ngOnInit() {
    this._activatedRoute.data.subscribe((data) => {
      this.project = data.project.metadata;
    });
  }
  deleteProject() {
    this.dialog.open(DeleteDialogComponent, {
      data: { project: this.project, service: this.projectService },
    });
  }
  updateProject() {
    this.router.navigate(["/edit/" + this.project.id]);
  }
}
