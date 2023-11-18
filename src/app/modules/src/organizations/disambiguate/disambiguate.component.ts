import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { isUndefined } from 'is-what';
import {
  Hit,
  MessageHandler,
  MetadataService,
  Organization,
  Redirect,
  StatusCode,
} from 'toco-lib';
import { OrgService } from '../_services/org.service';
import {
  OrgEditFormComponent,
  OrganizationDialogDeleteConfirm,
} from '../org-edit/org-edit-form/org-edit-form.component';
import { DisambiguationComponent } from './disambiguation/disambiguation.component';

@Component({
  selector: 'app-disambiguate',
  templateUrl: './disambiguate.component.html',
  styleUrls: ['./disambiguate.component.scss'],
})
export class DisambiguateComponent implements OnInit {
  @ViewChild('orgeditcomp') private _orgEdit: OrgEditFormComponent;
  @ViewChild('stepper') private myStepper: MatStepper;
  @ViewChild('disambiguatecomp')
  private _disambiguateComp: DisambiguationComponent;

  masterOrganization: Organization;
  secundariesOrganizations: Organization[];

  masterFormControl: UntypedFormControl;

  secundaryFormGroup: UntypedFormGroup;
  showSecundaries = false;
  orgMasterCtrl: UntypedFormControl;

  step = -1;

  orgFilter = [
    { type: 'country', value: 'Cuba' },
    { type: 'status', value: 'active' },
  ];

  loading: boolean = false;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _orgService: OrgService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private metadata: MetadataService,
    public dialog: MatDialog
  ) {}

  private initFields() {
    this.secundariesOrganizations = new Array();

    this.orgMasterCtrl = new UntypedFormControl('', Validators.required);

    this.masterFormControl = new UntypedFormControl(null, Validators.required);

    this.secundaryFormGroup = this._formBuilder.group({
      analogas: this.addItemsFormArray(null),
    });
  }

  ngOnInit() {
    this.initFields();

    this.activatedRoute.data.subscribe((data) => {
      if (this.masterOrganization) {
        this.metadata.meta.updateTag({
          name: 'DC.title',
          content: this.masterOrganization.name,
        });
        this.metadata.meta.updateTag({
          name: 'description',
          content:
            'Desambiguando organizaciones: ' + this.masterOrganization.name,
        });
        this.metadata.meta.updateTag({
          name: 'generator',
          content: 'Sceiba en Proyecto Vlir Joint',
        });
        this.metadata.meta.updateTag({
          name: 'keywords',
          content: 'Sceiba, organizaciones, identificación persistente, Cuba',
        });
        this.metadata.meta.updateTag({
          name: 'robots',
          content: 'index,nofollow',
        });
      }
    });
  }

  /***********************************************************
   * Stepper work
   ***********************************************************/
  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    if (this.step < this.secundariesOrganizations.length) {
      this.step++;
    } else {
      this.step = 0;
    }
  }

  public prevStep() {
    if (this.step > 0) {
      this.step--;
    } else {
      this.step = this.secundariesOrganizations.length - 1;
    }
  }

  /***********************************************************
   * addItemsFormArray build a form array group
   ***********************************************************/
  private addItemsFormArray(items: any[]) {
    let formArrayGroup = this._formBuilder.array(
      [],
      [Validators.required, Validators.minLength(1)]
    );
    if (isUndefined(items)) {
      formArrayGroup.push(
        this._formBuilder.group({
          id: new UntypedFormControl('', Validators.required),
          name: new UntypedFormControl('', Validators.required),
        })
      );
    } else {
      for (const item in items) {
        formArrayGroup.push(
          this._formBuilder.group({
            id: new UntypedFormControl(item['id']),
            name: new UntypedFormControl(item['name']),
          })
        );
      }
    }
    return formArrayGroup;
  }

  /***********************************************************
   * add Organizations to formgroup or formarray
   ***********************************************************/
  public addMaster() {
    this.dialog.open(DesambiguateOrganizationSelectDialog, {
      width: '90%',
      height: '90%',
      data: {
        cuban: true,
        multiple: false,
        selectOrg: (orgs: Organization[]) => {
          console.log('closed searc');

          this.receivingMaster(orgs);
        },
      },
    });
  }
  receivingMaster(master: Organization[]) {
    if (master.length > 0) {
      this.loading = false;
      this.masterOrganization = new Organization();
      this.masterOrganization.deepcopy(master[0]);
      this.masterFormControl.setValue(master[0]);
      //console.log(" Reciving master ********** ", master, "*******", this.masterOrganization, " ****** ", this.masterFormControl);
    }
  }
  public addSecundaries() {
    this.dialog.open(DesambiguateOrganizationSelectDialog, {
      width: '90%',
      height: '90%',
      data: {
        cuban: true,
        multiple: true,
        selectOrg: (orgs: Organization[]) => {
          console.log('closed searc');

          this.receivingSecundaries(orgs);
        },
      },
    });
  }
  receivingSecundaries(secundaries: Organization[]) {
    this.secundariesOrganizations = [];

    secundaries.forEach((secundaryOrg) => {
      const m = new MessageHandler(this._snackBar);
      if (secundaryOrg.id == this.masterOrganization.id) {
        m.showMessage(
          StatusCode.OK,
          secundaryOrg.name +
            ' Ya esta organización fue seleccionada como principal.'
        );
      } else if (
        this.secundariesOrganizations.some((x) => x.id == secundaryOrg.id)
      ) {
        m.showMessage(
          StatusCode.OK,
          secundaryOrg.name + ' Ya existe la organización como análoga.'
        );
      } else {
        this.secundariesOrganizations.push(secundaryOrg);
        this.addSecundaryOrgControl(secundaryOrg);
      }
    });
    this.loading = false;
  }

  addSecundaryOrgControl(secundaryOrg) {
    (this.secundaryFormGroup.get('analogas') as UntypedFormArray).push(
      this._formBuilder.group({
        id: new UntypedFormControl(secundaryOrg.id),
        name: new UntypedFormControl(secundaryOrg.name),
      })
    );
  }

  /***********************************************************
   * delete element in formarray
   ***********************************************************/
  deleteSecundaryOrg(pos) {
    const dialogRef = this._dialog.open(OrganizationDialogDeleteConfirm, {
      width: '60%',
      data: {
        label: (this.secundaryFormGroup.get('analogas') as UntypedFormArray)
          .value[pos].name,
      },
    });

    dialogRef.afterClosed().subscribe((isDeleted: boolean) => {
      if (isDeleted) {
        this.secundariesOrganizations.splice(pos, 1);
        (this.secundaryFormGroup.get('analogas') as UntypedFormArray).removeAt(
          pos
        );

        this._disambiguateComp.changingSecundaryPos(pos);
      }
    });
  }

  /***********************************************************
   * Update organizations with new information
   ***********************************************************/
  goDisambiguate(leave: boolean = false) {
    //console.log('EDITAR LA ORGANIZACION PRIONCIPA GOOOO DESAMBIGUATE.....')
    // editar la organizacion principal
    const toD = new Organization();
    this._orgEdit.fillObjectControls(); //esto debe hacerlo el form por el mismo
    toD.deepcopy(this._orgEdit.orgFormGroup.value);
    toD.status = 'active';
    toD.name = this._orgEdit.orgFormGroup.controls['name'].value;
    let fullOk = false;

    console.log('go disambiguate ', toD, this.secundariesOrganizations);

    this._orgService.editOrganization(toD).subscribe({
      next: (result: Hit<Organization>) => {
        console.log('resul del subscribe a editorg', result);
        if (result['SUCCES']) {
          fullOk = true;
        } else if (result['ERROR']) {
          console.log('hubo un error', result['ERROR']);

          const m = new MessageHandler(this._snackBar);
          m.showMessage(StatusCode.serverError, result['ERROR']);
        }
      },
      error: (err) => {
        console.log(err);

        const m = new MessageHandler(this._snackBar);
        m.showMessage(StatusCode.serverError, err.message);
      },
    });

    // cambiar el estado de las secundarias a reconect
    this.secundariesOrganizations.forEach((secOrg) => {
      secOrg.status = 'redirected';
      secOrg.redirect = new Redirect();
      secOrg.redirect.idtype = 'orgid';
      let idvalue = this.masterOrganization.id;
      secOrg.redirect.value = idvalue;

      // delete identifiers on secundary that exist in primary
      var newIds = []
      var add = true;
      secOrg.identifiers.forEach(secPid => {
        add = true;
        this.masterOrganization.identifiers.forEach(masterPid => {
          if (secPid.value == masterPid.value) {
            add = false;
          }
        });
        if (add) {
          newIds.push(secPid)
        }
      });
      secOrg.identifiers = newIds;

      let rec = new Organization();
      rec.deepcopy(secOrg);
      console.log('*******************************************************************************secundary org enviada', rec);

      this._orgService.editOrganization(rec).subscribe({
        next: (result: Hit<Organization>) => {
          console.log('sec org ', result);
          fullOk = true;
        },
        error: (err) => {
          console.log('reconnect', err);
        },
      });
    });

    if (fullOk) {
      const m = new MessageHandler(this._snackBar);
      m.showMessage(
        StatusCode.OK,
        'Su realizó la desambiguación correctamente'
      );
    }

    this._resetStepper();

    if (leave) {
      this._router.navigate(['/']);
    } else {
      this._resetStepper();
      this.initFields();
    }
  }

  changingStep(stepVar: StepperSelectionEvent) {
    //console.log(" changing stepper ", stepVar);
    if (stepVar.selectedIndex == 3 && stepVar.previouslySelectedIndex == 2) {
      let newOrg = new Organization();
      newOrg.deepcopy(this.masterOrganization);
      this.masterOrganization = newOrg;
    }

    if (stepVar.selectedIndex == 2 && stepVar.previouslySelectedIndex == 3) {
      let newOrg = new Organization();
      newOrg.deepcopy(this._orgEdit.orgFormGroup.value);
      this.masterOrganization = newOrg;
    }
  }

  private _resetStepper() {
    this.masterOrganization = undefined;
    this.showSecundaries = false;
    this.myStepper.reset();
    this.ngOnInit();
  }

  isValidForm() {
    try {
      if (this.masterOrganization) {
        return this._orgEdit.isValidForm();
      }
    } catch (err) {
      console.log(err);
    }

    return false;
  }
}

@Component({
  selector: 'org-desambiguate-select-dialog',
  templateUrl: './desambiguate.select-org-dialog.html',
})
export class DesambiguateOrganizationSelectDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DesambiguateOrganizationSelectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  public roles = [
    { label: 'Principal', value: 'MAIN' },
    { label: 'Colaborador', value: 'COLABORATOR' },
  ];
  public role = null;
  public orgs: Organization[];
  public cuban = true;
  public multiple = false;

  ngOnInit(): void {
    this.cuban = this.data.cuban;
    this.multiple = this.data.multiple;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  public selectedOrg(orgs): void {
    this.orgs = orgs;
    console.log(this.orgs);
  }
  public ok() {
    this.data.selectOrg(this.orgs);
    this.dialogRef.close();
  }
}
