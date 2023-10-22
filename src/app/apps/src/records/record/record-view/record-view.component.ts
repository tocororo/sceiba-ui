import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef as MatDialogRef, MAT_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar as MatSnackBar } from '@angular/material/snack-bar';

import { SourceVersion, MessageHandler, MetadataService, Record, SourceServiceNoAuth, StatusCode } from 'toco-lib';
//import { MetadataService } from 'toco-lib/lib/core/metadata.service';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.component.html',
  styleUrls: ['./record-view.component.scss']
})
export class RecordViewComponent implements OnInit {

  public record: Record;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute, private metadata: MetadataService, private sourceServiceNoAuth: SourceServiceNoAuth, public dialog: MatDialog, private _snackBar: MatSnackBar) { }

  public ngOnInit(): void
  {
    console.log('on init... ')
    /* Gets the `Record` data. */
    this._activatedRoute.data.subscribe(
      (data) => {
        this.record = data.record.metadata;
        /* console.log('AAAAAAAAAAAAAA')
        console.log(data); */
        this.metadata.meta.updateTag({name:"DC.title", content:this.record.title});
        this.record.creators.forEach(creator => {
        this.metadata.meta.updateTag({name:"DC.creator", content:creator['name']});
        });
        this.metadata.meta.updateTag({name:"DC.description", content:this.record.description});
        this.metadata.meta.updateTag({name:"DC.publisher", content:this.record.publisher});
        this.record.sources.forEach(source => {
          this.metadata.meta.updateTag({name:"DC.source", content:source});
        });
        this.record.rights.forEach(right => {
          this.metadata.meta.updateTag({name:"DC.rights", content:right});
        });
        this.record.types.forEach(type => {
          this.metadata.meta.updateTag({name:"DC.type", content:type});
        });
        this.record.formats.forEach(format => {
          this.metadata.meta.updateTag({name:"DC.format", content:format});
        });
        this.metadata.meta.updateTag({name:"DC.language", content:this.record.language});
        this.metadata.meta.updateTag({name:"DC.dateSubmitted", content:this.record.publication_date});
        this.record.contributors.forEach(contributor => {
          this.metadata.meta.updateTag({name:"DC.contributor", content:contributor['name']});
        });
      })
    /*
    this.metadata.meta.updateTag({name:"references", content:}); */
  }

  viewSource(uuid: string): void {
    this.sourceServiceNoAuth.getSourceByUUID(uuid).subscribe(
      response => {
        console.log(response);
        if (response.metadata) {
          let sourceVersion = new SourceVersion();
          sourceVersion.data.deepcopy(response.metadata);
          sourceVersion.source_uuid = response.id;
          const dialogRef = this.dialog.open(DialogCatalogSourceInfo, {
            data: {
              sourceVersion: sourceVersion,
              sourceUUID: uuid
            }
          });

          dialogRef.afterClosed();
        } else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(
            StatusCode.serverError,
            "No fue posible encontrar la Revista"
          );
        }
      },
      error => {
        console.log("error");
        error = true;
      },
      () => {}
    );
  }
}

@Component({
  selector: "dialog-catalog-source-info",
  template: `
    <mat-dialog-content class="height-auto">
    <h1>{{ data.sourceVersion.data.name }}</h1>
    </mat-dialog-content>
  `,
})
export class DialogCatalogSourceInfo implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogCatalogSourceInfo>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
