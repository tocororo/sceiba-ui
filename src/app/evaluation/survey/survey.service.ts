import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

import { cloneValue, Environment, Hit } from "toco-lib";

import {
  CategoryQuestionType,
  Evaluation,
  Evaluations,
  EvaluationAnswer,
  JournalGeneralData,
} from "./evaluation.entity";
import { evaluationEmpty_English, evaluationEmpty_Spanish } from "./constants";

/**
 * Represents the service that communicates with the backend for all issues
 * that refer to work with an `Evaluation` and/or `EvaluationAnswer`.
 */
@Injectable({
  providedIn: "root",
})
export class SurveyService {
  private _prefix = "evaluation";

  private _httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: "Bearer ",
    }),
  };

  public constructor(
    private _env: Environment,
    private _router: Router,
    private _http: HttpClient
  ) {}

  evaluation: any = [];
  evaluationProcessed: any = {};
  ////////////////////////////////////////////

  /**
   * Constructs a `PUT` request that interprets the body as a JSON object and returns
   * an observable of the response.
   * Sends the data that was inserted by the user (an `EvaluationAnswer` object
   * with the `resultAndRecoms` field sets to `undefined`) to the backend in order to
   * realize the processing and gets the result and recommendations.
   * Then, the backend returns an object `EvaluationAnswer` with the `resultAndRecoms`
   * field different of `undefined`, and this result is showed in the third part "Result and Recommendations".
   * @param evaluation Evaluation answer.
   * @param currentLang Language currently used as string.
   * The Spanish language is: 'es'.
   * The English language is: 'en'.
   * @return An `Observable` of the `HTTPResponse`, with a response body in the `Hit<Evaluation>` type.
   */

  public doEvaluation(
    evaluationAnswer: EvaluationAnswer,
    uuid: string,
    currentLang: string
  ): Observable<any> {
    return this.processSurvey({ uuid, sections: evaluationAnswer.survey }).pipe(
      map((res: any) => res.data.evaluation)
    );
  }

  public editEvaluation(evaluation: EvaluationAnswer): Observable<any> {
    //// Backend data //////////////////////////
    // // TODO: Poner correctamente el campo `this._env.sceibaApi` o crear un `this._env.evaluationApi`.
    // const url: string = this._env.sceibaApi + this._prefix + '/' + evaluation.id;

    // /* It is NOT necessary to indicate the language. */
    // return this._http.put<Hit<EvaluationAnswer>>(url, JSON.stringify(evaluation), this._httpOptions);
    ////////////////////////////////////////////

    //// Mock data /////////////////////////////
    console.error("editEvaluation: There is not backend yet!", evaluation);
    return of(evaluation);
    ////////////////////////////////////////////
  }

  getOneEvaluationById(uuid: string): Observable<any> {
    return this._http.get<any>(`${this._env.sceibaApi}${"evaluation"}/${uuid}`);
  }

  // First stepp
  // TODO: send {uuid, name ,ISSN} in the body
  addSurvey(data: JournalGeneralData & { uuid: string }): Observable<any> {
    return this._http.post<any>(`${this._env.sceibaApi}evaluation/init`, data);
  }

  // Second stepp
  // TODO: send the evaluation object in the body
  processSurvey(data): Observable<Evaluations[]> {
    return this._http.post<Evaluations[]>(
      `${this._env.sceibaApi}evaluation/process`,
      data
    );
  }

  // Last stepp
  saveEvaluation(uuid): Observable<any> {
    return this._http.post<any>(
      `${this._env.sceibaApi}evaluation/save/${uuid}`,
      {}
    );
  }
}
