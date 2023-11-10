import {
  Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild
} from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { JournalData, JournalDataType, JournalVersion, MessageHandler, SourceClasification, SourceOrganization, StatusCode, VocabulariesInmutableNames } from 'toco-lib';
import { SourceEditIndexesComponent } from '../../../source-edit/source-indexes/source-indexes.component';
import { SourceEditOrganizationsComponent } from '../../../source-organizations/source-organizations.component';

@Component({
  selector: "catalog-journal-view-version",
  templateUrl: "./journal-view-version.component.html",
  styleUrls: ["../version-view.component.scss"],
})
export class SourceJournalViewVersionComponent implements OnInit, OnChanges {
  @Input() public currentJournal: JournalVersion;

  public currentJournalData: JournalData;

  @Input() public type: number;

  @Input()
  public editingJournal: JournalVersion;

  public journalDataType = JournalDataType;

  public currentInstitutionTerms: Array<SourceClasification>;
  public currentDataBaseTerms: Array<SourceClasification>;
  public currentGroupTerms: Array<SourceClasification>;
  public currentProvinceTerms: Array<SourceClasification>;
  public currentSubjectTerms: Array<SourceClasification>;
  public currentLicenceTerms: Array<SourceClasification>;

  vocabularies;
  public panelOpenState = false;

  currentJournalChecked: boolean = false;

  @Output()
  editingJournalChange = new EventEmitter<JournalVersion>();

  loading = true;


  @ViewChild(SourceEditOrganizationsComponent)
  orgs: SourceEditOrganizationsComponent;

  @ViewChild(SourceEditIndexesComponent)
  indexes: SourceEditIndexesComponent;



  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.currentJournal == undefined)
      this.currentJournal = new JournalVersion();
    this.loadJournalData();

    if (this.type == undefined) this.type = JournalDataType.default;
  }

  ngOnChanges(): void {
    this.loading = true;

    this.ngOnInit();
    console.log("***//// SourceJournalViewVersionComponent ****////***///", this.currentJournal);
    // if(this.orgs && this.indexes) {
    //   this.orgs.ngOnInit();
    //   this.indexes.ngOnInit();
    // }
    this.loading = false;
  }

  loadJournalData() {
    // if (this.currentJournalData == undefined)
    //   this.currentJournalData = new JournalData();
    // this.currentJournalData.deepcopy(this.currentJournal.data);

    this.currentDataBaseTerms = new Array<SourceClasification>();
    this.currentGroupTerms = new Array<SourceClasification>();
    this.currentInstitutionTerms = new Array<SourceClasification>();
    this.currentLicenceTerms = new Array<SourceClasification>();
    this.currentProvinceTerms = new Array<SourceClasification>();
    this.currentSubjectTerms = new Array<SourceClasification>();

    this.vocabularies = VocabulariesInmutableNames;

    if (this.currentJournal.data.classifications) {
      this.currentJournal.data.classifications.forEach(
        (termSource: SourceClasification) => {
          switch (termSource.vocabulary.toString()) {
            case VocabulariesInmutableNames.CUBAN_INTITUTIONS:
              this.currentInstitutionTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.INDEXES:
              this.currentDataBaseTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.INDEXES_CLASIFICATION:
              this.currentGroupTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.LICENCES:
              this.currentLicenceTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.CUBAN_PROVINCES:
              this.currentProvinceTerms.push(termSource);
              break;
            case VocabulariesInmutableNames.SUBJECTS:
              this.currentSubjectTerms.push(termSource);
              break;
          }
        }
      );
    }
  }

  /**
   * Changes the field `reviewed` of a `Journal`, that means the user saw these version
   * and consider it not has more information.
   */
  markAsViewed() {
    if (this.currentJournalChecked) {
      this.currentJournal.data.reviewed = true;
      // TODO: hacer el request al backend de marcar la version como vista o
      const m = new MessageHandler(this._snackBar);
      m.showMessage(StatusCode.OK, "Revisión marcada como vista!!!");
    }
  }

  public fieldEditingJournalChange() {
    this.editingJournalChange.emit(this.editingJournal);
  }

  public replace() {
    this.editingJournal = this.currentJournal;
    // this.editingJournal.data.classifications = [];
    // this.editingJournal.data.classifications = this.currentJournal.data.classifications;
    this.editingJournalChange.emit(this.editingJournal);
    // // this.currentJournal.data.classifications.forEach((termSource: SourceClasification) => {

    // //     this.editingJournal.data.classifications.push(termSource);

    // // });
    console.log("editingJournal remplazado", this.editingJournal);
  }

  /**
   * Concats a `Journal` property by a equal property in `JournalData`.
   * @param type is a `JournalDataType` enum, that means, `type` has all properties of a `Journal` enumerated as identifyer.
   * @param termId is a `Term` identifyer, only needs if `type` is `JournalDataType.term`.
   * @NOTE this function call `replace(..., true)`
   */
  public concat(type: JournalDataType, termSource: SourceClasification) {
    if (type == JournalDataType.term) {
      let notFound = true;
      for (
        let index = 0;
        index < this.editingJournal.data.classifications.length;
        index++
      ) {
        const element = this.editingJournal.data.classifications[index];
        if (element.id == termSource.id) {
          this.editingJournal.data.classifications[index].data =
            termSource.data;
          notFound = false;
        }
      }
      if (notFound) {
        this.editingJournal.data.classifications.push(termSource);
      }
      this.editingJournalChange.emit(this.editingJournal);
    }
  }

  public replaceSubjects() {
    this.replaceClassifications(VocabulariesInmutableNames.SUBJECTS);
  }

  public replaceIndexes() {
    this.replaceClassifications(VocabulariesInmutableNames.INDEXES);
  }

  public replaceClassifications(vocab: string) {
    let found = false;
    let newts: SourceClasification[] = [];

    this.editingJournal.data.classifications.forEach((ts) => {
      if (ts.vocabulary != vocab) {
        newts.push(ts);
      }
    });

    this.currentJournal.data.classifications.forEach((ts) => {
      if (ts.vocabulary == vocab) {
        newts.push(ts);
      }
    });
    this.editingJournal.data.classifications = newts;

    this.editingJournalChange.emit(this.editingJournal);
  }

  public replaceOrganizations() {
    let found = false;
    let newts: SourceOrganization[] = [];

    this.currentJournal.data.organizations.forEach((ts) => {
      newts.push(ts);
    });

    this.editingJournal.data.organizations = newts;

    this.editingJournalChange.emit(this.editingJournal);
  }
}
