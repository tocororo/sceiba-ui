import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { Environment, HandlerComponent, Hit, JournalVersion, MessageHandler, Organization, OrganizationServiceNoAuth, Response, ResponseStatus, SourceClasification, SourceOrganization, SourceService, SourceStatus, SourceTypes, SourceVersion, StatusCode } from 'toco-lib';
import { Utils } from "../../_services/utils";


@Component({
  selector: "catalog-source-view",
  templateUrl: "./source-view.component.html",
  styleUrls: ["./source-view.component.scss"],
})

export class SourceViewComponent implements OnInit {
  public sourceType = SourceTypes;

  public topOrganizationPID = null;
  public topMainOrganization: Hit<Organization> = null;

  public editingVersion: SourceVersion;
  public versions: Array<SourceVersion>;

  public dialogCommentText = "";
  public loading = true;
  public allows = "";
  public error = false;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _sourceService: SourceService,
    private orgService: OrganizationServiceNoAuth,
    private environment: Environment
  ) { }

  ngOnInit() {
    this.topMainOrganization = Utils.getTopOrganization(this.orgService, this.environment);

    this.route.data.subscribe(
      (response) => {
        console.log("VIEW SOURCE");
        console.log(response);
        let src = response.source.data.source.record;
        this.allows = response.source.data.source.allows;
        try {
          this.init(src.id, src.metadata);
        } catch (error) {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, response.toString());
        }
      },
      (err: any) => {
        console.log("error: " + err + ".");
        console.log('bbb');

      },
      () => {
        console.log("complete");
      }
    );
  }

  _init_source_relations(v: SourceVersion) {
    let so = new Array<SourceOrganization>();
    if (v.data.organizations) {
      v.data.organizations.forEach(element => {
        let o = new SourceOrganization();
        o.deepcopy(element);
        so.push(o);
      });
    }
    v.data.organizations = so;
    let sc = new Array<SourceClasification>();
    if (v.data.classifications) {
      v.data.classifications.forEach(element => {
        let o = new SourceClasification();
        o.deepcopy(element);
        sc.push(o);
      });
    }
    v.data.classifications = sc;
  }

  init(id, src) {

    switch (src.source_type) {
      case this.sourceType.JOURNAL.value:
        this.editingVersion = new JournalVersion();
        this.editingVersion.source_uuid = id;
        this.editingVersion.data.deepcopy(src);
        break;

      default:
        this.editingVersion = new SourceVersion();
        this.editingVersion.source_uuid = id;
        this.editingVersion.data.deepcopy(src);
    }

    this._init_source_relations(this.editingVersion);


    this._sourceService
      .getSourceVersions(this.editingVersion.source_uuid)
      .subscribe(
        (response) => {
          console.log(response);
          if (response.status == ResponseStatus.SUCCESS) {
            this.versions = response.data.versions;
            for (let index = 0; index < this.versions.length; index++) {
              this._init_source_relations(this.versions[index]);

            }
            this.loading = false;
          }
        },
        (error) => {
          console.log("error");
        },
        () => { }
      );

    // initialize Journal

  }

  public saveEditingVersion() {
    const dialogRef = this.dialog.open(SourceViewSaveDialog, {
      data: { comment: this.dialogCommentText, accept: false, edit: true },
    });
    console.log(this.editingVersion);

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("The dialog was closed");
        console.log(dialogRef.getState());
        console.log(result);

        if (result && result.accept) {
          this.dialogCommentText = result.comment;
          this.editingVersion.comment = this.dialogCommentText;
          this.loading = true;
          this._sourceService
            .editSource(this.editingVersion, this.editingVersion.source_uuid)
            .subscribe(
              (res: Response<any>) => {
                console.log(res);
                const m = new MessageHandler(null, this.dialog);
                if (res.status == ResponseStatus.SUCCESS && res.data.source_version.data) {
                  m.showMessage(
                    StatusCode.OK,
                    "Guardada con la revisión < " + this.editingVersion.comment + ">",
                    HandlerComponent.dialog,
                    "Éxito"
                  );
                  this.editingVersion = null;
                  this.versions = null;
                  this.init(res.data.source_version.source_uuid, res.data.source_version.data);
                  // this._router.navigate(['sources', this.editingVersion.source_uuid, 'view']);
                } else {
                  m.showMessage(
                    StatusCode.serverError,
                    res.message,
                    HandlerComponent.dialog,
                    "ERROR"
                  );
                  // m.showMessage(StatusCode.serverError, res.message);
                }
              },
              (error: any) => {
                console.log(error);
                return of(null);
              },
              () => { }
            );
        }
      },
      (error: any) => {
        console.log(error);
        return of(null);
      },
      () => { }
    );
  }

  // public editVersion(): void {
  //   this._router.navigate(["sources", this.editingVersion.source_uuid, "edit"]);
  // }

  public publishEditingVersion() {
    const dialogRef = this.dialog.open(SourceViewSaveDialog, {
      data: { comment: this.dialogCommentText, accept: false, publish: true },
    });
    console.log(this.editingVersion);

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("The dialog was closed");
        console.log(dialogRef.getState());
        console.log(result);

        if (result && result.accept) {
          this.dialogCommentText = result.comment;
          this.editingVersion.comment = this.dialogCommentText;
          this.loading = true;
          console.log(this.editingVersion);

          this._sourceService
            .makeSourceAsApproved(
              this.editingVersion,
              this.editingVersion.source_uuid
            )
            .subscribe(
              (res: Response<any>) => {
                console.log(res);
                this.loading = false;
                const m = new MessageHandler(null, this.dialog);
                if (res.status == ResponseStatus.SUCCESS && res.data.source) {
                  m.showMessage(
                    StatusCode.OK,
                    'La revisión actual de <' + this.editingVersion.data.title + "> ha sido publicada con éxito",
                    HandlerComponent.dialog,
                    "Éxito"
                  );
                  // this.ngOnInit();
                  this._router.navigate(['directory', this.editingVersion.source_uuid]);
                } else {
                  m.showMessage(
                    StatusCode.serverError,
                    res.message,
                    HandlerComponent.dialog,
                    "ERROR"
                  );
                  // m.showMessage(StatusCode.serverError, res.message);
                }
              },
              (error: any) => {
                console.log(error);
                return of(null);
              },
              () => { }
            );
        }
      },
      (error: any) => {
        console.log(error);
        return of(null);
      },
      () => { }
    );
  }

  public desapprove() {
    const dialogRef = this.dialog.open(SourceViewSaveDialog, {
      data: { comment: this.dialogCommentText, accept: false, unpublish: true },
    });
    console.log(this.editingVersion);

    dialogRef.afterClosed().subscribe(
      (result) => {
        console.log("The dialog was closed");
        console.log(dialogRef.getState());
        console.log(result);
        this.loading = true;
        if (result && result.accept) {
          this._sourceService
            .makeSourceAsUnApproved(
              this.editingVersion,
              this.editingVersion.source_uuid
            )
            .subscribe(
              (res: Response<any>) => {
                console.log(res);
                const m = new MessageHandler(null, this.dialog);
                this.loading = false;
                if (res.status == ResponseStatus.SUCCESS && res.data.source) {
                  m.showMessage(
                    StatusCode.OK,
                    this.editingVersion.data.title + ' ya no está pública.',
                    HandlerComponent.dialog,
                    "Éxito"
                  );
                  this.ngOnInit();
                  this._router.navigate(['sources']);
                } else {
                  m.showMessage(
                    StatusCode.serverError,
                    res.message,
                    HandlerComponent.dialog,
                    "ERROR"
                  );
                  // m.showMessage(StatusCode.serverError, res.message);
                }
              },
              (error: any) => {
                console.log(error);
                return of(null);
              },
              () => { }
            );
        }
      },
      (error: any) => {
        console.log(error);
        return of(null);
      },
      () => { }
    );
  }

  public is_approved() {
    return (
      this.editingVersion.data.source_status == SourceStatus.APPROVED.value
    );
  }

  public can_publish() {
    return this.allows == "publish";
  }

  public source_type_label(){
    switch (this.editingVersion.data.source_type) {
      case SourceTypes.JOURNAL.value:
        return SourceTypes.JOURNAL.label;
      case SourceTypes.REPOSITORY.value:
        return SourceTypes.REPOSITORY.label
      default:
        return SourceTypes.OTHER.label;
    }
  }

}

@Component({
  selector: "catalog-journal-view-save-dialog",
  template: `
      <ng-container *ngIf="data.edit">
        <h1 mat-dialog-title>Guardar cambios</h1>
        <div mat-dialog-content>
          <mat-form-field>
            <mat-label>Comentario sobre esta revisión</mat-label>
            <textarea matInput [(ngModel)]="data.comment"> </textarea>
          </mat-form-field>
        </div>
      </ng-container>

      <ng-container *ngIf="data.publish">
      <h1 mat-dialog-title>Guardar cambios y publicar</h1>
      <div mat-dialog-content>
        <mat-form-field>
          <mat-label>Comentario sobre esta revisión</mat-label>
          <textarea matInput [(ngModel)]="data.comment"> </textarea>
        </mat-form-field>
      </div>
    </ng-container>

    <ng-container *ngIf="data.unpublish">
      <h1 mat-dialog-title>Este elemento no será más público</h1>
      <div mat-dialog-content>
      </div>
    </ng-container>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Cancelar</button>
      <button
        mat-button
        [mat-dialog-close]="data"
        cdkFocusInitial
        (click)="data.accept = true"
      >
        Guardar
      </button>
    </div>
  `,
})
export class SourceViewSaveDialog {
  constructor(
    public dialogRef: MatDialogRef<SourceViewSaveDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.data.accept = false;
    this.dialogRef.close();
  }
}
