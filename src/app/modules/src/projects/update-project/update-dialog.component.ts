import { Component, Inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../project/people.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CommonModule } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TocoSnackbarComponent } from "../toco-snackbar/toco-snackbar.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatIconModule } from "@angular/material/icon";
import { Project } from "../project/person.entity";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MomentDateAdapter } from "@angular/material-moment-adapter";

const MY_DATE_FORMAT = {
  parse: {
    dateInput: "DD/MM/YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT },
  ],
  selector: "update-dialog-form",
  templateUrl: "update-dialog.component.html",
  styleUrls: ["update-dialog.component.scss"],
  standalone: true,
  imports: [
    MatCardModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class UpdateProjectComponent implements OnInit {
  public projectForm = this.formBuilder.group({
    title: this.formBuilder.array([], Validators.required),
    creator: this.formBuilder.array([], Validators.required),
    contributor: this.formBuilder.array([], Validators.required),
    identifiers: this.formBuilder.array([], Validators.required),
    lenguaje: this.formBuilder.array([], Validators.required),
    publisher: this.formBuilder.array([], Validators.required),
    fundingReference: this.formBuilder.array([], Validators.required),
    relatedIdentifier: this.formBuilder.array([], Validators.required),
    publishDate: this.formBuilder.group({
      dateValue: this.formBuilder.control([""], Validators.required),
      dateType: this.formBuilder.control([""], Validators.required),
    }),
  });

  public titleTypes = [
    "AlternativeTitle",
    "Subtitle",
    "TranslatedTitle",
    "Other",
  ];

  public dateTypes = ["Available", "Issued", "Accepted"];

  public idTypes = ["ark", "doi", "handle", "purl", "url", "urn", "sceibaid"];

  public contributorType = [
    "ContactPerson",
    "DataCollector",
    "DataCurator",
    "DataManager",
    " Distributor",
    "Editor",
    " HostingInstitution",
    "Producer",
    "ProjectLeader",
    "ProjectManager",
    "ProjectMember",
    "RegistrationAgency",
    "RegistrationAuthority",
    "RelatedPerson",
    "Researcher",
    "ResearchGroup",
    "RightsHolder",
    "Sponsor",
    "Supervisor",
    "WorkPackageLeader",
    "Other",
  ];

  public isLoading = false;
  public step = 0;
  public project: Project;
  constructor(
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private service: ProjectService
  ) {}
  ngOnInit() {
    this.isLoading = false;
    this.activeRoute.params.subscribe(({ id }) => {
      this.service.getProjectById(id).subscribe((data) => {
        this.project = data.metadata;
        this.buildForm();
        console.log(this.projectForm.value);
      });
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  get title() {
    return this.projectForm.get("title") as FormArray;
  }

  get fundingReference() {
    return this.projectForm.get("fundingReference") as FormArray;
  }

  get relatedIdentifier() {
    return this.projectForm.get("relatedIdentifier") as FormArray;
  }

  get creator() {
    return this.projectForm.get("creator") as FormArray;
  }

  get contributor() {
    return this.projectForm.get("contributor") as FormArray;
  }
  get identifiers() {
    return this.projectForm.get("identifiers") as FormArray;
  }
  get lenguaje() {
    return this.projectForm.get("lenguaje") as FormArray;
  }
  get publisher() {
    return this.projectForm.get("publisher") as FormArray;
  }
  get publishDate() {
    return this.projectForm.get("publishDate") as FormControl;
  }

  addTitle(title?) {
    this.title.push(
      this.formBuilder.group({
        title: [title ? title.title : ""],
        titleType: [title ? title.titleType : ""],
        lang: [title ? title.lang : ""],
      })
    );
  }

  addFundingReference(fund?) {
    this.fundingReference.push(
      this.formBuilder.group({
        founderName: [fund ? fund.founderName : ""],
        awardURI: [fund ? fund.awardURI : ""],
        awardNumber: [fund ? fund.awardNumber : ""],
      })
    );
  }

  addRelatedIdentifier(identifier?) {
    this.relatedIdentifier.push(
      this.formBuilder.group({
        idType: [identifier ? identifier.idType : ""],
        idValue: [identifier ? identifier.idValue : ""],
      })
    );
  }

  addLenguaje(lenguaje?) {
    this.lenguaje.push(this.formBuilder.control(lenguaje ? lenguaje : ""));
  }
  addPublisher(publisher?) {
    this.publisher.push(this.formBuilder.control(publisher ? publisher : ""));
  }
  addCreator(creator?) {
    this.creator.push(
      this.formBuilder.group({
        creatorName: [creator ? creator.creatorName : ""],
        givenName: [creator ? creator.givenName : ""],
        familyName: [creator ? creator.familyName : ""],
      })
    );
  }
  addContributor(contributor?) {
    this.contributor.push(
      this.formBuilder.group({
        contributorName: [contributor ? contributor.contributorName : ""],
        contributorType: [contributor ? contributor.contributorType : ""],
        familyName: [contributor ? contributor.familyName : ""],
      })
    );
  }
  addIdentifier(identifier?) {
    this.identifiers.push(
      this.formBuilder.group({
        idtype: [identifier ? identifier.idtype : ""],
        value: [identifier ? identifier.value : ""],
      })
    );
  }
  delTitle(i) {
    this.title.removeAt(i);
  }
  delLenguaje(i) {
    this.lenguaje.removeAt(i);
  }
  delCreator(i) {
    this.creator.removeAt(i);
  }

  delRelatedId(i) {
    this.relatedIdentifier.removeAt(i);
  }

  delFundingReference(i) {
    this.fundingReference.removeAt(i);
  }

  delContributor(i) {
    this.contributor.removeAt(i);
  }
  delIdentifier(i) {
    this.identifiers.removeAt(i);
  }
  delPublisher(i) {
    this.publisher.removeAt(i);
  }

  onSubmit() {
    this.project.identifiers.map((value) => {
      this.addIdentifier(value);
    });
    if (this.projectForm.valid) {
      this.isLoading = !this.isLoading;

      this.publishDate.setValue({
        dateType: this.publishDate.value.dateType,
        dateValue: new Date(
          this.publishDate.value.dateValue
        ).toLocaleDateString("en-GB"),
      });
      this.service
        .updateProject(this.project.id, this.projectForm.value)
        .subscribe(
          (data) => {
            this.isLoading = !this.isLoading;
            const snackBarRef = this._snackBar.openFromComponent(
              TocoSnackbarComponent,
              {
                data: {
                  message: "Proyecto Actualizado",
                  action: "Hecho",
                },
                duration: 3000,
              }
            );
            snackBarRef.afterDismissed().subscribe((data) => {
              this.router.navigate(["/project/" + this.project.id + "/view"]);
            });
          },
          (error) => {
            const snackBarRef = this._snackBar.openFromComponent(
              TocoSnackbarComponent,
              {
                data: {
                  message: error.message,
                  action: "Ok",
                },
                duration: 1500,
              }
            );
            snackBarRef.afterDismissed().subscribe(() => this.buildForm());
          }
        );
    } else {
      const snackBarRef = this._snackBar.openFromComponent(
        TocoSnackbarComponent,
        {
          data: {
            message: "Formulario Invalido",
            action: "Hecho",
          },
          duration: 3000,
        }
      );
    }
  }

  buildForm() {
    this.project.title.map((title) => {
      this.addTitle(title);
    });
    this.project.creator.map((creator) => {
      this.addCreator(creator);
    });
    this.project.contributor.map((contributor) => {
      this.addContributor(contributor);
    });
    this.project.lenguaje.map((leng) => {
      this.addLenguaje(leng);
    });
    this.project.publisher.map((pub) => {
      this.addPublisher(pub);
    });
    this.project.fundingReference.map((f) => {
      this.addFundingReference(f);
    });
    this.project.relatedIdentifier.map((iden) => {
      this.addRelatedIdentifier(iden);
    });
    const date = ["", "", ""];

    this.project.publishDate.dateValue.split("/").map((v, i) => {
      switch (i) {
        case 0:
          date[1] = v;
          break;
        case 1:
          date[0] = v;
          break;
        case 2:
          date[2] = v;
          break;
      }
    });
    this.publishDate.setValue({
      dateType: this.project.publishDate.dateType,
      dateValue: new Date(date.join("/")),
    });
  }
}
