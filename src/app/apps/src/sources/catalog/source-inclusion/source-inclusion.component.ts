import { Component, Inject, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { ContainerPanelActionComponent, Environment, FormContainerAction, FormFieldType, HandlerComponent, HintPosition, HintValue, Hit, InputTextComponent, Journal, JournalVersion, MessageHandler, Organization, OrganizationServiceNoAuth, PanelActionContent, SelectOption, Source, SourcePersonRole, SourceService, SourceServiceNoAuth, SourceTypes, SourceVersion, StatusCode } from 'toco-lib';




@Component({
  selector: "catalog-source-inclusion",
  templateUrl: "./source-inclusion.component.html",
  styleUrls: ["./source-inclusion.component.scss"]
})
export class SourceInclusionComponent implements OnInit {
  public source: Source = null;
  public versionToEdit: SourceVersion = null;

  public topOrganizationPID = null;
  public topMainOrganization: Hit<Organization> = null;


  public sourceType = SourceTypes;

  public loading = false;
  public isStartProcess = true;

  public searchJournalAction: FormContainerAction;
  findPanel: PanelActionContent;
  findFormGroup: UntypedFormGroup;

  constructor(
    private sourceService: SourceService,
    private sourceServiceNoAuth: SourceServiceNoAuth,
    private _formBuilder: UntypedFormBuilder,
    public dialog: MatDialog,
    private _router: Router,
    private orgService: OrganizationServiceNoAuth,
    private environment: Environment
  ) { }


  ngOnInit() {
    if (localStorage.getItem('topMainOrganization') && localStorage.getItem('topMainOrganization') != '') {
      const response = JSON.parse(localStorage.getItem('topMainOrganization'));
      this.topMainOrganization = response;

    } else {
      if (this.environment.topOrganizationPID) {
        this.topOrganizationPID = this.environment.topOrganizationPID;
        this.orgService
          .getOrganizationByPID(this.topOrganizationPID)
          .subscribe(
            (response) => {
              this.topMainOrganization = response;
              // new Organization();
              // this.topMainOrganization.deepcopy(response.metadata);
            },
            (error) => {
              console.log("error");
            },
            () => { }
          );
      }
    }
    this.findFormGroup = this._formBuilder.group({});
    this.findPanel =
    {
      name: 'panel',
      controlType: ContainerPanelActionComponent,
      label: "Introduzca el ISSN de la revista que desea incluir.",
      description: "",
      iconName: "",
      formSection: this.findFormGroup,
      formSectionContent: [
        {
          'formControl': InputTextComponent.getFormControlByDefault(),
          name: "idenfifier",
          label: "Identificador",
          type: FormFieldType.text,
          controlType: InputTextComponent,
          required: true,
          startHint: new HintValue(
            HintPosition.start,
            "(ISSN, RNPS, URL, Título)"
          ),
          width: "100%"
        }
      ],
      actionLabel: 'Buscar',
      action: {
        doit: () => {
          const identifier = this.findFormGroup.controls['idenfifier'].value;
          this.loading = true;


          const m = new MessageHandler(null, this.dialog);
          let title = "No hemos encontrado información";
          let content =
            "Debe completar todos los datos solicitados para incluir la revista.";

          this.sourceServiceNoAuth.getSourceByISSN(identifier).subscribe(
            response => {
              if (response && response.metadata) {
                this.source = new Journal();
                this.versionToEdit = new JournalVersion();
                console.log(response.metadata);
                this.source.deepcopy(response.metadata);
                this.versionToEdit.source_uuid = response.metadata.id;
                this.versionToEdit.data.deepcopy(response.metadata);

                title = "Tenemos información sobre la revista";
                content =
                  "Compruebe y complete todos los datos solicitados para incluir la revista.";

                this.isStartProcess = false;
                this.loading = false;
                m.showMessage(
                  StatusCode.OK,
                  content,
                  HandlerComponent.dialog,
                  title
                );
              } else {
                this.sourceServiceNoAuth.getSourceByPID(identifier).subscribe(
                  response => {
                    if (response && response.metadata) {
                      let src = response.metadata;
                      switch (src.source_type) {
                        case this.sourceType.JOURNAL.value:
                          this.source = new Journal();
                          this.versionToEdit = new JournalVersion();
                          console.log(response.metadata);
                          this.source.deepcopy(response.metadata);
                          this.versionToEdit.source_uuid = response.metadata.id;
                          this.versionToEdit.data.deepcopy(response.metadata);
                          title = 'Tenemos información sobre la revista';
                          content = "Compruebe y complete todos los datos solicitados para incluir la revista.";
                          break;
                        default:
                          title = 'No soportado';
                          content = 'El identificador: ' +
                            identifier +
                            'no pertenece a una revista. Este sistema no soporta esta funcionalidad.';
                          this.source = new Source();
                          this.source.data.deepcopy(src);
                      }
                      this.isStartProcess = false;
                      this.loading = false;
                      m.showMessage(
                        StatusCode.OK,
                        content,
                        HandlerComponent.dialog,
                        title
                      );

                    } else {
                      this.source = new Journal();
                      this.versionToEdit = new JournalVersion();
                      this.source.isNew = true;
                      this.versionToEdit.isNew = true;
                      this.loading = false;
                      this.isStartProcess = false;
                      m.showMessage(
                        StatusCode.OK,
                        content,
                        HandlerComponent.dialog,
                        title
                      );
                    }
                  },
                  (error: any) => { },
                  () => { }
                );
              }
            },
            (error: any) => { },
            () => { }
          );
        }
      }
    }
      ;


  }

  journalEditDone() {
    // this.isEditig = false;
    // this.isViewing = true;
    // console.log(this.versionToEdit)
    // this.journalStep.completed = true;
    // this.journalStep.hasError = false;
    // this.stepper.next();
  }
  resetEdit() {
    this.source = null;
    this.isStartProcess = true;
  }

  finishInclusion() {

    let dialogRef;
    this.dialog.open(SourceInclusionAcceptComponent, {
      data: {
        accept: (role) => {
          this.dialog.closeAll();
          console.log(" KONIEC", role, this.versionToEdit);
          this.sourceService.newSource(this.versionToEdit, this.versionToEdit.source_uuid, role)
            .subscribe(
              (values) => {
                console.log(values);
                this._router.navigate(['sources', this.versionToEdit.source_uuid, 'view']);
              },
              (err: any) => {
                console.log('error: ' + err + '.');
              },
              () => {
                console.log('complete');
              }
            );

        }
      }
    });
  }
}





@Component({
  selector: "catalog-journal-addinstextra",
  template: `

  <h2>
  Acuerdo legal
</h2>
<p>
  texto del acuerdo legal
</p>

<h3>Subtitulo</h3>
<p>algo mas...</p>

  <container-panel-action [content]="agreementPanel">

  <!--  <toco-form-container
  [panelsContent]="agreementPanel"
  [useAccordion]="false"
  [formGroup]="agreementFormGroup"
  [action]="acceptAction"
  [actionLabel]="'Terminar'"
>
</toco-form-container> -->
  `
})
export class SourceInclusionAcceptComponent implements OnInit {

  agreementPanel: PanelActionContent;
  agreementFormGroup: UntypedFormGroup;

  accept;
  acceptAction: FormContainerAction;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.accept = data.accept;
  }

  ngOnInit() {
    this.agreementFormGroup = this._formBuilder.group({
      agree: new UntypedFormControl(false)
    });
    this.agreementPanel =
    {
      name: 'agreement',
      label: "Acuerdo Legal",
      description: "",
      iconName: "",
      formSection: this.agreementFormGroup,
      formSectionContent: [
        {
          name: "role",
          label: "Rol",
          type: FormFieldType.select_expr,
          controlType: InputTextComponent,
          required: true,
          width: "100%",
          value: null,
          extraContent: {
            getOptions: () => {
              const opts: SelectOption[] = [];
              Object.keys(SourcePersonRole).forEach(key => {
                opts.push({
                  value: SourcePersonRole[key].value,
                  label: SourcePersonRole[key].label
                });
              });
              return opts;
            }
          }
        },
        {
          name: "agree",
          label: "Acepto",
          type: FormFieldType.checkbox,
          required: true,
          width: "100%",
          value: false
        },
      ],
      action: {
        doit: (data: any) => {
          if (this.agreementFormGroup.status == 'VALID') {
            this.accept(this.agreementFormGroup.value['role']);
          }

        }
      },
      actionLabel: 'Aceptar'
    }
      ;
  }
}
