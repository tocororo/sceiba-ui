import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import Swal from "sweetalert2";
import { ConfigurationJsonService } from "../_services/configuration-json.service";
import { GetBreakpointService } from "../_services/get-breakpoint.service";
import { Configuration } from "../models/configuration.interface";
import { ChangeMetadataConfigurationDialogComponent } from "./change-metadata-configuration-dialog/change-metadata-configuration-dialog.component";
import { UploadWidgetComponent } from "./upload-widget/upload-widget.component";


@Component({
  selector: "app-data-transformation",
  templateUrl: "./data-transformation.component.html",
  styleUrls: ["./data-transformation.component.scss"],
})
export class DataTransformationComponent implements OnInit{
  mobileQuery: MediaQueryList;
  currentBreakpoint: string;
  cols_section1: number = 2;
  cols_section2: number = 3;
  colspan_section2: number = 1;
  modal_height: string="45vh";
  modal_widht: string="50vh";
  configuration_name:string=""
  configuration_description:string=""
   configuration:Configuration


  public buttons_array: any[] = [
    { label: "IMPORT", color: "basic",toltip:"IMPORTAR_TOLTIP",isdisabled:false   },

    { label: "EXPORTAR", color: "primary",toltip:"EXPORTAR_TOLTIP",isdisabled:true  },
    // { label: "CANCELAR", color: "accent",toltip:"CANCELAR_TOLTIP" },
    { label: "TRANSFORMAR", color: "accent",toltip:"TRANSFORMAR_TOLTIP",isdisabled:true },

  ];

  constructor(
    private snackBar: MatSnackBar, public get_breakpoint_service:GetBreakpointService,public dialog: MatDialog, public config_service:ConfigurationJsonService
  ) {

    this.currentBreakpoint = get_breakpoint_service.getBreakpoint();
  }

  ngOnInit() {
    this.addGridStyle();
    this.config_service.getConfigurationJson().subscribe((config)=>{
      if (config) {
        this.configuration=config
        this.buttons_array.forEach((button)=>{
          if (button.label=="TRANSFORMAR"||button.label=="EXPORTAR") {
            button.isdisabled=false
            
          }
        })
      if (this.configuration.name) {
        this.configuration_name=config.name
        
        
      }
    if (this.configuration.description) {
      this.configuration_description=config.description

      
    }}
    })
  }
  openEDitDescriptionDialog(old_description:string){
    
    const dialogRef = this.dialog.open(ChangeMetadataConfigurationDialogComponent, {
      data: old_description,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.configuration.description=result
      this.config_service.setConfigurationJson(this.configuration)
    });
  }
  openEDitNameDialog(old_name:string){
    
    const dialogRef = this.dialog.open(ChangeMetadataConfigurationDialogComponent, {
      data: old_name,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.configuration.name=result
      this.config_service.setConfigurationJson(this.configuration)
    });
  }

  /**
   * check if it is mobile view, if so, assign 1 to my column variable and
   * to the height of my rows of 30 em and so on with all my breakpoints
   *
   */
  public addGridStyle() {
    if (this.get_breakpoint_service.getBreakpoint() === "Handset") {
      this.cols_section1 = 1;
      this.cols_section2 = 1;
   
    } else if (this.get_breakpoint_service.getBreakpoint() === "Tablet") {
      this.cols_section1 = 2;
      this.cols_section2 = 3;
      this.colspan_section2=2;
    } else if (this.get_breakpoint_service.getBreakpoint() === "Mobil"){
   
      this.cols_section1 = 2;
      this.colspan_section2 = 2;
    }
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(UploadWidgetComponent, {
      width: this.modal_widht,
      height: this.modal_height,
      maxHeight:this.modal_height,
      
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  handleButtonClick(label: string) {
    if (label === 'IMPORT') {
      this.openDialog('0ms', '0ms');
    } else if (label === 'EXPORTAR') {
console.log("save");
this.exportConfigurationFile()
    } 
    else if (label === 'TRANSFORMAR') {
      console.log("TRANSFORMAR");
      this.transformWithConfigurationFile()

          }else {
            console.log("CANCELAR");

      // Otra condición o acción por defecto
    }
  }
/**
 * Transforms the configuration into a File and sends it to the backend.
 */
transformWithConfigurationFile() {
  this.config_service.getConfigurationJson().subscribe((configuration: any) => {
    // Create a new File object with the configuration content
    const file = new File([JSON.stringify(configuration)], 'config.json', { type: 'application/json' });
    // Send the file to the backend
    this.config_service.sendConfiguracionFile(file);
  });
}
exportConfigurationFile() {
  this.config_service.getConfigurationJson().subscribe((configuration: any) => {
    if (configuration) {
      const json = JSON.stringify(configuration);
      const blob = new Blob([json], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'config.json';
      a.click();
      window.URL.revokeObjectURL(url);
      Swal.fire({
        title: "Exportación exitosa",
        text: "Fichero exportado correctamente",
        icon: "success",
        confirmButtonColor:"#26915b "     

      });
      
    }
    else{
      console.error("No configuration file to export")
      
    }
   
  });
}
}
