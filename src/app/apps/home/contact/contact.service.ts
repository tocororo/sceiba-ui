import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthBackend, Environment } from 'toco-lib';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  public backend: AuthBackend = AuthBackend.sceiba

  constructor(
    private env: Environment,
    private http: HttpClient)
  { }

  public send(body): Observable<any>{
    let url = "";

    if (this.backend == AuthBackend.sceiba){
      url = this.env.sceibaApi + "contact";
    }
    else if (this.backend == AuthBackend.cuor) {
      url = this.env.cuorApi + "contact";
    }

    return this.http.post<any>(url, body)
  }
}
