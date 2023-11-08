import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IdentifierSchemas, JournalData, JournalVersion, MessageHandler, SourceData, SourceService, SourceTypes, SourceVersion, StatusCode } from 'toco-lib';
@Component({
  selector: 'catalog-source-view-read',
  templateUrl: './source-view-read.component.html',
  styleUrls: ['./source-view-read.component.scss']
})
export class SourceViewReadComponent implements OnInit {
  public sourceType = SourceTypes;
  public IdentifierSchemas = IdentifierSchemas;

  public source: SourceVersion;
  public editingSource: SourceVersion;
  public dialogCommentText = "";
  public saving = false;
  public source_type_label = SourceTypes.JOURNAL.label;


  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _sourceService: SourceService
  ) {}

  ngOnInit() {
    this.route.data.subscribe({
      next: (response) => {
        if (response.source && response.source.metadata) {
          let src = response.source.metadata;
          let data;
          switch (src.source_type) {
            case this.sourceType.JOURNAL.value:
              data = new JournalData();
              data.deepcopy(src);
              this.source = new JournalVersion();
              this.source.data.deepcopy(data);
              this.source.source_uuid = response.source.id;
              console.log(this.source);

              break;

            default:
              data = new SourceData();
              data.deepcopy(src);
              this.source = new SourceVersion();
              this.source.id = response.source.id;
              this.source.source_uuid = response.source.id;
              this.source.data.deepcopy(data);
              this.source.data.id = response.source.id;
              if(src.source_type == this.sourceType.REPOSITORY.value){
                this.source_type_label = this.sourceType.REPOSITORY.label;
              } else {
                this.source_type_label = this.sourceType.OTHER.label;
              }
          }
        } else {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, response.toString());
        }
      },
      error: (err: any) => {
        console.log("error: " + err + ".");
      },
      complete: () => {
        console.log("complete");
      }
    });
  }
  getIdentifier(idtype: IdentifierSchemas) {
    var r = this.source
    ? this.source.data.getIdentifierValue(idtype)
    : "";

  return r;
}

}
