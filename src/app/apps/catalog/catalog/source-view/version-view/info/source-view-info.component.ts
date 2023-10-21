import { Component, Input, OnChanges, OnInit, ViewChild } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { IdentifierSchemas, JournalData, SourceClasification, SourceData, SourceService, SourceTypes, SourceVersion, VocabulariesInmutableNames } from 'toco-lib';
import { SourceEditIndexesComponent } from '../../../source-edit/source-indexes/source-indexes.component';
import { SourceEditOrganizationsComponent } from '../../../source-organizations/source-organizations.component';
;


@Component({
  selector: "catalog-source-view-version-info",
  templateUrl: "./source-view-info.component.html",
  styleUrls: ["../version-view.component.scss"],
})
export class SourceViewVersionInfoComponent implements OnInit, OnChanges {
  @Input() public sourceVersion: SourceVersion;
  @Input() public showVersionLabel: boolean = true;
  public sourceData: SourceData;


  /** TODO: In the future databaseTerms and subjectTerms will be changes by
   *  miarTerms and subjectsUnescoTerms
   *  public miarTerms: Array<SourceClasification>;
   *  public subjectsUnescoTerms: Array<SourceClasification>;
   */
  public institutionTerms: Array<SourceClasification>;
  public dataBaseTerms: Array<SourceClasification>;
  public groupTerms: Array<SourceClasification>;
  public provinceTerms: Array<SourceClasification>;
  public subjectTerms: Array<SourceClasification>;
  public licenceTerms: Array<SourceClasification>;

  public vocabularies: typeof VocabulariesInmutableNames;
  public panelOpenState = false;

  public IdentifierSchemas = IdentifierSchemas;

  @ViewChild(SourceEditOrganizationsComponent)
  orgs: SourceEditOrganizationsComponent;

  @ViewChild(SourceEditIndexesComponent)
  indexes: SourceEditIndexesComponent;

  public sourceTypes = SourceTypes;

  loading = true;
  constructor(
    private _sourveService: SourceService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.loadSourceData();
  }
  ngOnChanges(): void {
    console.log("changes....");
    this.loadSourceData();
    this.loading = false;
  }
  loadSourceData() {
    if (this.sourceData == undefined){
      if(this.sourceVersion.data.source_type == this.sourceTypes.JOURNAL.value) {
          this.sourceData = new JournalData();
        }
        else{
          this.sourceData = new SourceData();
        }
      }

    console.log("!!!!!!!!!!!!!!!!!!!0000!!!!!!!!!!!!!");
    console.log(this.sourceVersion)
    this.sourceData.deepcopy(this.sourceVersion.data);
    console.log("!!!!!!!!!!!!!!!!!!!!!1!!!!!!!!!!!!!");
    console.log(this.sourceData)

    this.dataBaseTerms = new Array<SourceClasification>();
    this.groupTerms = new Array<SourceClasification>();
    this.institutionTerms = new Array<SourceClasification>();
    this.licenceTerms = new Array<SourceClasification>();
    this.provinceTerms = new Array<SourceClasification>();
    this.subjectTerms = new Array<SourceClasification>();

    this.vocabularies = VocabulariesInmutableNames;
    if (this.sourceData.classifications) {
      this.sourceData.classifications.forEach(
        (term: SourceClasification) => {
          switch (term.vocabulary.toString()) {
            case VocabulariesInmutableNames.CUBAN_INTITUTIONS:
            case VocabulariesInmutableNames.EXTRA_INSTITUTIONS:
              this.institutionTerms.push(term);
              break;
            case VocabulariesInmutableNames.INDEXES:
              this.dataBaseTerms.push(term);
              break;
            case VocabulariesInmutableNames.INDEXES_CLASIFICATION:
              this.groupTerms.push(term);
              break;
            case VocabulariesInmutableNames.LICENCES:
              this.licenceTerms.push(term);
              break;
            case VocabulariesInmutableNames.CUBAN_PROVINCES:
              this.provinceTerms.push(term);
              break;
            case VocabulariesInmutableNames.SUBJECTS:
              this.subjectTerms.push(term);
              break;
          }
        }
      );
    }
  }


  getIdentifier(idtype: IdentifierSchemas) {
      var r = this.sourceData
      ? this.sourceData.getIdentifierValue(idtype)
      : "";

    return r;
  }

  editingSourceChange(newVersion: SourceVersion): void {
    console.log("*****llego....", newVersion, this.sourceData);

    this.loadSourceData();
    this.orgs.ngOnInit();
    this.indexes.ngOnInit();
  }
}


@Component({
    selector: "catalog-source-view-version-info-field",
    styleUrls: ["../version-view.component.scss"],
    template: `
    <mat-label style="font-weight: bold;">{{label}}: </mat-label>
    <mat-label *ngIf="value">
      {{ value }}
    </mat-label>
    <mat-label
      *ngIf="!value"
      class="text-muted text-through"
      >{{emptyLabel}}
    </mat-label
    >`
  })
  export class SourceViewVersionInfoFieldComponent {
    @Input()
    label: string;
    @Input()
    value: string;
    @Input()
    emptyLabel: string = 'Vacío';
  }
