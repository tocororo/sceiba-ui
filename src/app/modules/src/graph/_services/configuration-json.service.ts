import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Configuration } from '../models/configuration.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationJsonService {
  URL_DEL_BACKEND= "https://127.0.0.1:5000/api/graph/config"
  private configurationJson$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private rulespropertieslabel$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient,private snackBar: MatSnackBar) { }
  getConfigurationJson(): Observable<Configuration> {
    return this.configurationJson$.asObservable();
  }

  setConfigurationJson(json: Configuration): void {
    this.configurationJson$.next(json);
    
  }
  getRulesPropertiesLabel(): Observable<string> {
    return this.rulespropertieslabel$.asObservable();

  }
 /**
 * Sets the label for the rules properties.
 * 
 * @param label The label to set.
 */
setRulesPropertiesLabel(label: string): void {
  this.rulespropertieslabel$.next(label);
}

  sendConfiguracionFile(configuration: File) {
    const formData = new FormData();
    
    formData.append('file', (configuration));
    console.log(formData.get('file'));

    this.http.post(this.URL_DEL_BACKEND, formData)
      .subscribe(
        response => {
          // Lógica para manejar la respuesta del backend
          console.log('Respuesta del backend:', response);
         
        },
        error => {
          // Lógica para manejar errores
          console.error('Error en la solicitud:', error);
          Swal.fire({
            title: "Error en la solicitud",
            text: error.message,
            icon: "error",
            confirmButtonColor:"#26915b "     

            
          });
        }
      );
      Swal.fire({
        title: "Proceso completado",
        text: "Se realizo la transformación con exito",
        icon: "success",
        confirmButtonColor:"#26915b "     

       
      });
  }






}