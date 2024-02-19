import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {
  URL_DEL_BACKEND= "https://127.0.0.1:5000/api/graph/sparql"
  private query_response$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private label_response$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {}
  getQueryResponse(): Observable<any> {
    return this.query_response$.asObservable();
  }
  getLabelResponse(): Observable<any> {
    return this.label_response$.asObservable();
  }

  setQueryResponse(response:any): void {
    this.query_response$.next(response);
    
  }

  getQuery(query: string ) {
    const formData = new FormData();
    
    formData.append('query', (query));
    console.log(formData.get('query'));
    this.http.post(this.URL_DEL_BACKEND, formData)
      .subscribe(
        (response:any) => {
          // Lógica para manejar la respuesta del backend
          console.log('Respuesta del backend:', response);
          this.setQueryResponse(response)
          this.label_response$.next(response)
          Swal.fire({
            title: "Proceso completado",
            text: response.message,
            icon: "success",
            confirmButtonColor:"#26915b "     

            
          });
        },
        error => {
          // Lógica para manejar errores
          console.error('Error en la solicitud:', error);
          this.label_response$.next((JSON.stringify(error)))
          Swal.fire({
            title: "Error en la solicitud",
            text: error.message,
            icon: "error",
            confirmButtonColor:"#26915b "     

            
          });
        }
      );

  }
}
