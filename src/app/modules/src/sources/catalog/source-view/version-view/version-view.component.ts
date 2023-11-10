/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */


import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Environment, Hit, JournalVersion, MessageHandler, MetadataService, Organization, SourceVersion, StatusCode, VocabulariesInmutableNames } from 'toco-lib';
import { SourceJournalViewVersionComponent } from './version/journal-view-version.component';



@Component({
    selector: 'catalog-journal-view',
    templateUrl: './version-view.component.html',
    styleUrls: ['./version-view.component.scss']
})
export class SourceVersionViewComponent implements OnInit {


    @Input()
    public topMainOrganization: Hit<Organization> = null;


    /**************** auxiliary variables *******************/

    public panelOpenState = false;


    public defaultLogo = this.environment.sceibaHost + 'static/favicon.ico'

    /**
     * Button roperty, is to enable or disable if there are not more versions
     */
    isDisabledNavigatePrevious: boolean;
    isDisabledNavigateNext: boolean;

    public vocabularies: typeof VocabulariesInmutableNames;


    /**************** journal variables *******************/

    /**
     * Represents a Journal Object, it is a type of Source.
     * Need the source.version array filled
     */
    // @Input()
    // public journal: JournalData;

    @Input()
    public editingSource: SourceVersion;

    @Input()
    public versions: Array<SourceVersion>;


    /**************** select journal version variables *******************/

    /**
     * the current version of a Journal, (a type of Source)
     * it is to compare and show changes between Journal and last version of journal
     * iteration over journal.versions
     */
    public selectedSource: SourceVersion;


    /** TODO: In the future databaseTerms and subjectTerms will be changes by
     *  miarTerms and subjectsUnescoTerms
     *  public miarTerms: Array<SourceClasification>;
     *  public subjectsUnescoTerms: Array<SourceClasification>;
    */


    /**
     * Properties to move between versions
     */
    private selectedVersion: number;
    private lengthVersion: number;



    public showVersions = false;
    public editVersion = false;

    @ViewChild(SourceJournalViewVersionComponent)
    versionComponent: SourceJournalViewVersionComponent;


    constructor(
        private metadata: MetadataService,
        private environment: Environment,
        private _snackBar: MatSnackBar,
        public dialog: MatDialog
    ) { }

    ngOnInit() {

        this.isDisabledNavigatePrevious = true;
        this.isDisabledNavigateNext = false;

        this.vocabularies = VocabulariesInmutableNames;

        // guardar la cantidad total de versiones
        this.lengthVersion = this.versions.length;
        // guardar la posicion de la version donde este la actual
        this.selectedVersion = this.getSelectedSourcePosition();

        this.SelectSourceVersion();

        this.metadata.setStandardMeta('Revista Científica ' + this.editingSource.data.title, this.editingSource.data.description, "");

        // if (this.versions){
        //   this.versions.forEach((journalVersion: JournalVersion, index: number) => {
        //     // check if has versions to view and return that position
        //     if (journalVersion.is_current) {
        //         this.currentJournal = new JournalVersion();
        //         this.currentJournal.deepcopy(journalVersion);
        //     }
        //   });
        // }
    }



    /**
     * Changes the selected position to the next one if possible
     */
    public nextVersion(): void {

        if (this.selectedVersion < this.lengthVersion - 1) {

            this.isDisabledNavigateNext = false;
            this.isDisabledNavigatePrevious = false;
            this.selectedVersion++;
            this.SelectSourceVersion();

        }
        else {

            this.isDisabledNavigateNext = true;
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, 'No hay más versiones para mostrar')

        }
        if (this.selectedVersion == this.lengthVersion - 1) {
            this.isDisabledNavigateNext = true;
        }
    }

    /**
     * Changes the selected position to the before one if possible
     */
    public previousVersion(): void {

        if (this.selectedVersion > 0) {
            this.isDisabledNavigatePrevious = false;
            this.isDisabledNavigateNext = false;
            this.selectedVersion--;
            this.SelectSourceVersion();

        }
        else {

            this.isDisabledNavigatePrevious = true;
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, 'No hay más versiones para mostrar')

        }
        if (this.selectedVersion == 0) {
            this.isDisabledNavigatePrevious = true;
        }
    }

    /**
     * Selects the selected journal as a JournalVersion
     */
    public SelectSourceVersion(): void {

      if (this.versions.length >= 0 &&
          this.selectedVersion >= 0 &&
          this.selectedVersion < this.versions.length) {

          // load the selected journal
          this.selectedSource = new JournalVersion();
          this.selectedSource.deepcopy(this.versions[this.selectedVersion]);
          // this.selectedJournal = version;
          console.log('this.selectedVersion', this.selectedVersion, this.selectedSource)
          // if(this.versionComponent) {
          //   this.versionComponent.ngOnChanges();
          // }
          // load if was viewed
          // this.selectedJournalChecked = this.selectedJournal.reviewed;

      }
    }


    /**
     * Returns the position of the unseen version of the journal as JournalVersion
     */
    private getSelectedSourcePosition(): number {
        let count = 0;
        this.versions.forEach((journalVersion: JournalVersion, index: number) => {

            // check if has versions to view and return that position
            if (journalVersion.reviewed != null && journalVersion.reviewed) {
                count = index;
                return count;
            }
        });
        return count;
    }

    sourceEditDone(version: JournalVersion) {
        this.editVersion = false;
        console.log('AAaAAAAAAAAAAAAAAAAAA');

    }

    toogleShowVersions(){
        this.showVersions = !this.showVersions
        this.editVersion = false;
    }


}

