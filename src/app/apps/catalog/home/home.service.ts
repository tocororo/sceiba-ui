
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment, Response } from 'toco-lib';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private environment: Environment, protected http: HttpClient) { }

  getOrganizationInfo(organization: string): Observable<Response<any>> {
    return this.http.get<Response<any>>(this.environment.sceibaApi + 'source/info/' + organization);
  }
  getSourcesOrgAggregation(uuid): Observable<Response<any>> {
    const req = this.environment.sceibaApi + 'source/aggs/org/' + uuid;
    return this.http.get<Response<any>>(req);
  }
}
