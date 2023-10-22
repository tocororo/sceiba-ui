/*
 *   Copyright (c) 2020 Universidad de Pinar del Río "Hermanos Saíz Montes de Oca"
 *   All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Environment, Hit, JournalData, JournalVersion, MessageHandler, Organization, SourceData, SourceService, SourceTypes, SourceVersion, StatusCode } from 'toco-lib';

@Component({
  selector: 'catalog-source-edit',
  templateUrl: './source-edit.component.html',
  styleUrls: ['./source-edit.component.scss']
})
export class SourceEditComponent implements OnInit {

  public topOrganizationPID = null;
  public topMainOrganization: Hit<Organization> = null;

  public sourceType = SourceTypes;
  public source: SourceData;
  public sourceVersion: SourceVersion;
  public saving = false;

  public allows = '';
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private sourceService: SourceService,
    private environment: Environment,
  ) {
    if (environment.topOrganizationPID) {
      this.topOrganizationPID = environment.topOrganizationPID;
    }
  }

  ngOnInit() {
    console.log("EDIT SOURCE")
    this.saving = true;
    this.route.data
      .subscribe((response) => {

        // this.loading = false;
        console.log(response);

        try {
          let src = response.source.data.source.record.metadata;
          this.allows = response.source.data.source.allows;
          switch (src.source_type) {
            case this.sourceType.JOURNAL.value:
              this.source = new JournalData();
              this.source.deepcopy(src);
              this.sourceVersion = new JournalVersion();
              this.sourceVersion.source_uuid = this.source.id;
              this.sourceVersion.data.deepcopy(this.source);
              this.saving = false;



              break;

            default:
              this.source = new SourceData();
              this.source.deepcopy(src);
          }
        } catch (error) {
          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, response.message);
        }
      }
      );
  }

  sourceEditDone(edited: SourceVersion) {
    this.saving = true;
    console.log('AAaAAAAAAAAAAAAAAAAAA');

    console.log(edited);

    console.log(this.sourceVersion);

    console.log('AAaAAAAAAAAAAAAAAAAAA');
    this.saving = false;
    this.sourceService.editSource(this.sourceVersion, this.source.id)
      .subscribe(
        (values) => {
          console.log(values);
          this._router.navigate(['sources', this.source.id, 'view']);
          this.saving = false;
        },
        (err: any) => {
          console.log('error: ' + err + '.');
        },
        () => {
          console.log('complete');
        }
      );

    // this.saving = true;
    // let toReplace = -1;
    // for (let index = 0; index < this.version.data.term_sources.length; index++) {
    //   const element = this.version.data.term_sources[index];
    //   if (element.term.vocabulary_id == VocabulariesInmutableNames.INTITUTION
    //     && element.term.isNew) {
    //     toReplace = index;
    //   }
    // }
    // this.taxonomyService.newTerm(this.version.data.term_sources[toReplace].term)
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //       let newTerm = new Term();
    //       newTerm.deepcopy(response.data.term);
    //       this.version.data.term_sources[toReplace].term_id = newTerm.id;
    //       this.sourceService.editSource(this.version, this.source.uuid)
    //         .subscribe(
    //           (values) => {
    //             console.log(values);
    //             this._router.navigate(['sources', this.source.uuid, 'view']);
    //             this.saving = false;
    //           },
    //           (err: any) => {
    //             console.log('error: ' + err + '.');
    //           },
    //           () => {
    //             console.log('complete');
    //           }
    //         );
    //     },
    //     (err: any) => {
    //       console.log('error: ' + err + '.');
    //     },
    //     () => {
    //       console.log('complete');
    //     }
    //   );
  }

  // createNewTerms() {
  //   this.version.data.term_sources.forEach((ts: TermSource, index) => {
  //     if (ts.term.isNew &&
  //         (ts.term.vocabulary_id === VocabulariesInmutableNames.INTITUTION
  //         || ts.term.vocabulary_id === VocabulariesInmutableNames.EXTRA_INSTITUTIONS)) {
  //           this.postNewTerm(index);
  //           return;
  //     }
  //   });
  // }
  // private postNewTerm(index) {
  //   this.taxonomyService.newTerm(this.version.data.term_sources[index].term)
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         let newTerm = new Term();
  //         newTerm.deepcopy(response.data.term);
  //         this.version.data.term_sources[index].term_id = newTerm.id;
  //         this.version.data.term_sources[index].term = newTerm;
  //         this.createNewTerms();
  //       },
  //       (err: any) => {
  //         console.log('error: ' + err + '.');
  //       },
  //       () => {
  //         console.log('complete');
  //       }
  //     );
  // }

  editCanceled() {
    this._router.navigate(['sources', this.source.id, 'view']);
  }
}


          // {
          //   name: 'source_type',
          //   label: 'Tipo de Revista',
          //   type: FormFieldType.select_expr,
          //   required: true,
          //   width: '45%',
          //   value: this.journalVersion ? this.journalVersion.source_type : '',
          //   extraContent: {
          //     getOptions: () => {
          //       console.log(this.journalVersion.source_type);
          //       console.log(SourceTypes[this.journalVersion.source_type]);
          //       const opts: SelectOption[] = [
          //         {
          //           value: SourceTypes.JOURNAL.value,
          //           label: SourceTypes.JOURNAL.label,
          //         },
          //         {
          //           value: SourceTypes.STUDENT.value,
          //           label: SourceTypes.STUDENT.label,
          //         },
          //         {
          //           value: SourceTypes.POPULARIZATION.value,
          //           label: SourceTypes.POPULARIZATION.label,
          //         },
          //       ];
          //       return opts;
          //     }
          //   }
          // },
