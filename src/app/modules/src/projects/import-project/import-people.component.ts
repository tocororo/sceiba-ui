import { Component} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { MessageHandler, StatusCode } from "toco-lib";
import { ProjectService } from "../project/people.service";
import { ParamMap, Params, Router } from "@angular/router";

@Component({
  selector: "app-import-people",
  templateUrl: "./import-people.component.html",
  styleUrls: ["./import-people.component.scss"],
})
export class ImportPeopleComponent {
  people: any;
  file: File[] = [];
  dataSource = new MatTableDataSource<any>([]);
  m = new MessageHandler(this._snackBar);
  org: any;

  isJsonFile: boolean = false;
  isOpenDialog: boolean = false;

  requiredCSVkyes = [
    "apellido1",
    "apellido2",
    "externals_email",
    "idExpediente",
    "institutional_email",
    "noCi",
    "nombre",
    "pais",
    "sexo",
  ];

  requiredJSONKyes = [
    "title",
    "creator",
    "contributor",
    "identifiers",
    "lenguaje",
    "publishDate",
    "relatedIdentifier",
    "fundingReference",
    "publisher",
  ];

  constructor(
    private _snackBar: MatSnackBar,
    private peopleService: ProjectService,
    public dialog: MatDialog
  ) {}

  onSelect(event: any) {
    const file = [...event.addedFiles];
    this.readFile(file[0]).then((fileContents: string) => {
      let persons = null;
      if (file[0].type !== "application/json") {
        const jsonFile = this.csvToJson(fileContents);
        persons = JSON.parse(jsonFile);
        const areValidCSVKeys =
          Array.isArray(persons) &&
          this.requiredCSVkyes.every((key) => persons[0].hasOwnProperty(key));

        if (areValidCSVKeys) {
          this.isJsonFile = false;
          this.file = file;

          // this.isOpenDialog=true
          return;
        }
      } else {
        persons = JSON.parse(fileContents);

        if (
          persons.hasOwnProperty("projects") &&
          this.requiredJSONKyes.every((key) =>
            persons.projects[0].hasOwnProperty(key)
          )
        ) {
          this.isJsonFile = true;
          this.file = file;
          // this.isOpenDialog=true
          return;
        }
      }

      this.m.showMessage(
        StatusCode.OK,
        "El archivo a importar no cumple con los campos requeridos"
      );
      // if (this.file.length > 0) {
      //   this.m.showMessage(StatusCode.OK, "Solo se puede seleccionar un archivo");
      // }else {
      //   this.file.push(...);
      //   this.openDialog()
    });
  }

  showData() {
    console.log(this.file);

    if (this.file.length === 0) {
      this.m.showMessage(StatusCode.OK, "No hay archivo para mostrar");
    } else {
      this.readFile(this.file[0]).then((fileContents: string) => {
        if (this.file[0].type !== "application/json") {
          const jsonFile = this.csvToJson(fileContents);
          this.people = JSON.parse(jsonFile);
        } else {
          this.people = JSON.parse(fileContents).persons;
        }
        // const eliminado = this.people.shift();
        this.dataSource.data =
          this.people.length > 800 ? this.people.slice(0, 800) : this.people;
        console.log(
          "🚀 ~ file: import-people.component.ts:130 ~ this.readFile ~ this.dataSource.data",
          this.dataSource.data
        );
      });
    }
  }

  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = (e) => {
        // console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        // console.error("No file to read.");
        return reject(null);
      }

      reader.readAsText(file);
    });
  }

  onRemove(event: any) {
    console.log(event);
    this.file.splice(this.file.indexOf(event), 1);
    this.people = [];
  }

  csvToJson(csv: any) {
    let lines = csv.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    for (let i = 0; i < lines.length; i++) {
      const obj = {};
      const currentLine = lines[i].split(",");

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }
      result.push(obj);
    }
    return JSON.stringify(result);
  }

  saveData() {
    if (this.file.length === 0) {
      this.m.showMessage(StatusCode.OK, "No hay archivo para guardar");
    } else {
      this.peopleService.saveImport(this.file[0]).subscribe((response) => {
        console.log(response);
        this.m.showMessage(StatusCode.OK, "Importado con exito");
      });
    }
  }

  filtersChange(values: Params) {
    console.log(values.organizations);
  }

  afterClosed(result) {
    console.log(
      "🚀 ~ file: import-people.component.ts:201 ~ afterClosed ~ result:",
      result
    );
    this.isOpenDialog = false;
    this.org = result;
  }
}
