import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'toco-lib';
import { Evaluations } from './survey/evaluation.entity';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  private _userEvaluationsURL: string = "evaluation/user/list"

  constructor( private httpClient: HttpClient, private env: Environment) { }

  getUserEvaluations(): Observable<Evaluations[]>{
    return this.httpClient.get<Evaluations[]>(`${this.env.sceibaApi}${this._userEvaluationsURL}`);
  }

  getEvaluationsById(uuid: string): Observable<any>{
    return this.httpClient.get<any>(`${this.env.sceibaApi}${'evaluation'}/${uuid}`);

  }

  createEvaluation(): Observable<any>{

    return this.httpClient.post<any>(`${this.env.sceibaApi}${'evaluation/new'}`, {});
  }

   cloneEvaluation(uuid: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.env.sceibaApi}evaluation/clone/${uuid}`, {}
    );
  }

}
