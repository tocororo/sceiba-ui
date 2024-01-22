import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ConfigurationJsonService } from '../../_services/configuration-json.service';

@Component({
  selector: 'app-upload-widget',
  templateUrl: './upload-widget.component.html',
  styleUrls: ['./upload-widget.component.scss'],
  
})
export class UploadWidgetComponent {
  files: File[] = [];
  constructor(private configurationService: ConfigurationJsonService,private snackBar: MatSnackBar) { }
  /** 
   * This method handles the selection of a file and performs a validation process on it. 
   * It saves the first selected file in the  selectedFile  variable and waits for the  processFile  method to validate the file. 
   * If the file is valid, it adds it to the  files  array. Otherwise, it logs an error message. 
   *  
   * @param event The event containing the selected file(s) 
   */
  async onSelect(event) {
    const selectedFile = event.addedFiles[0]
    const isValidFile = await this.processFile(selectedFile);
    if (isValidFile) {
      this.files.push(selectedFile);
    } else {
      console.error("Invalid file selected.");
    }

  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onSave() {
    if (this.files[0]) {
      
    }
    let selectedFile = this.files[0];
    const fileReader = new FileReader();
    // Read the content of the file
    fileReader.onload = (e) => {
      try {
        // Parse the file content as JSON
        const parsedData = JSON.parse(fileReader.result as string);
        //Set the parsed  JSON data in the ConfigurationJsonService
        this.configurationService.setConfigurationJson(parsedData);
        // The 'parsedData' now contains the parsed JSON object from the file
        console.log('Valid JSON file:', parsedData);
        Swal.fire({
      title: "Importación exitosa",
      text: "Fichero Importado correctamente",
      icon: "success",
      confirmButtonColor:"#26915b "     

    });

      } catch (error) {
        console.error('The file is not a valid JSON.', error);
      
        selectedFile = null;
      }
    };
    fileReader.readAsText(selectedFile);


  }
  // Process the selected file
  async processFile(selected: any): Promise<boolean> {
    // Get the first selected file
    let selectedFile = selected;

    // Validate that the file has a .json extension
    if (selectedFile.name.endsWith('.json')) {

      return true
    } else {
      console.error('The file does not have a .json extension');
Swal.fire({
  title: "Error en la importación",
  text: "El fichero no tiene una extension .json",
  icon: "error",
  confirmButtonColor:"#26915b "     

 
});

      return false
    }
  }


}